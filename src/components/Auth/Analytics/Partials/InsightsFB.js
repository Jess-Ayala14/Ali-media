import React, { useState, useEffect } from 'react';
import { Nav, Row, Col, Card, Button } from 'react-bootstrap';

import { createStore } from 'state-pool';

const store = createStore();
store.setState("analyticsFB", []);
store.setState("dayAnalytics", []);
store.setState("weekAnalytics", []);
store.setState("monthAnalytics", []);

export const InsightsFB = (data) => {

    const loginFB = data['dataFromParent'][0];
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const APICALLFB = 'me/insights?metric=page_impressions,page_post_engagements,page_daily_follows,page_total_actions'
    var [analyticsFB, setAnalytics] = store.useState("analyticsFB");
    const [dayAnlyticsFB, setdayAnalytics] = store.useState("dayAnalytics");
    const [weekAnlyticsFB, setweekAnalytics] = store.useState("weekAnalytics");
    const [monthAnlyticsFB, setmonthAnalytics] = store.useState("monthAnalytics");

    useEffect(() => {

        if (loginFB !== false) {
            allInsights();
        }

    }, [ACCESS_TOKEN]);

    function allInsights() {
        window.FB.api(
            APICALLFB,
            "GET",
            {
                access_token: ACCESS_TOKEN
            },
            function (response) {
                setAnalytics(formatFB(getAnalyticsFB(response)));
                setdayAnalytics(formatday(getAnalyticsFB(response)));
                setweekAnalytics(formatweek(getAnalyticsFB(response)));
                setmonthAnalytics(formatmonth(getAnalyticsFB(response)));
            }
        );

        function getAnalyticsFB(response) {
            return response['data'];
        }

        function formatFB(insights) {
            const content = Object.keys(insights).map(key => {
                if (insights[key].values && insights[key].values.length > 0) {
                    return [
                        insights[key].name || null,
                        insights[key].values || null,
                        insights[key].title || null,
                        insights[key].period || null,
                        insights[key].description || null
                    ];
                }
            }).filter(item => item !== undefined); // Filtra los elementos undefined

            return content;
        }

        function formatday(insights) {
            const content = Object.keys(insights).map(key => {
                if (insights[key].period === "day" && insights[key].values && insights[key].values.length > 0) {
                    return [
                        insights[key].name || null,
                        insights[key].values[1] && insights[key].values[1]['value'] || null,
                        insights[key].period || null
                    ];
                }
            }).filter(item => item !== undefined); // Filtra los elementos undefined

            // Se crea la estructura de datos esperada, solo si hay elementos válidos
            const dataDay = content.length > 0 ? [
                content.map((data) => data[0]),
                content.map((data) => data[1])
            ] : []; // Asegura que 'dataDay' no tenga datos vacíos

            return dataDay;
        }

        function formatweek(insights) {
            const content = Object.keys(insights).map(key => {
                if (insights[key].period === "week" && insights[key].values && insights[key].values.length > 0) {
                    return [
                        insights[key].name || null,
                        insights[key].values || null,
                        insights[key].period || null
                    ];
                }
            }).filter(item => item !== undefined); // Filtra los elementos undefined

            return content;
        }

        function formatmonth(insights) {
            const content = Object.keys(insights).map(key => {
                if (insights[key].period === "days_28" && insights[key].values && insights[key].values.length > 0) {
                    return [
                        insights[key].name || null,
                        insights[key].values || null,
                        insights[key].period || null
                    ];
                }
            }).filter(item => item !== undefined); // Filtra los elementos undefined

            return content;
        }
    }

    function GetAnalyticsFB(props) {
        const FBinsights = props.analytics;
        const listItems = FBinsights.map((insight, index) => (
            <React.Fragment key={index}>
                <br />
                {insight[0] != null &&
                    <Card className='card-insightFB'>
                        <Card.Title className='text-left'>{insight[0]}</Card.Title>
                        <Card.Body>
                            <Card.Text>
                                <p className='text-left'>{insight[1][0] != null ? insight[1][0].value : 'No data'},  <b>{' date: '}</b> {insight[1][0] != null ? insight[1][0].end_time : 'no data'}</p>
                                <p className='text-left'>{insight[1][1] != null ? insight[1][1].value : 'No data'},  <b>{' date: '}</b> {insight[1][1] != null ? insight[1][1].end_time : 'no data'}</p>

                                <div>
                                    <p className='text-left'>{insight[2]}  <b>{'  Period: '}</b>  {insight[3]}</p>
                                    <p className='little-text text-justify'>{insight[4]}</p>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                }
            </React.Fragment>
        ));

        return (
            <ul>{listItems}</ul>
        );
    }

    return (
        <>
            {loginFB === true
                ? (
                    <Row>
                        <Col xs={1} md={2} lg={4}/>
                        <Col xs={10} md={8} lg={4}>
                            {<GetAnalyticsFB analytics={analyticsFB} />}
                        </Col>
                        <Col xs={1} md={2} lg={8} />
                    </Row>
                )
                : (
                    <Row className="card-insight">
                        <Col xs={1} md={3} lg={4} />
                        <Col xs={10} md={6} lg={4}>
                            <br />
                            <Card className="card-insightFB">
                                <Card.Body className='text-center'>
                                    <Card.Text>
                                        Please Authorize Facebook
                                    </Card.Text>
                                    <Button href='/Settings' className="btn-instagram">Go to settings</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={1} md={3} lg={4} />
                    </Row>
                )
            }
        </>
    );
}

export default InsightsFB;
