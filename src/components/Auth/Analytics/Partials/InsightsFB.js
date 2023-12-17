import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

import { createStore } from 'state-pool';

const store = createStore();
store.setState("analyticsFB", []);
store.setState("dayAnalytics", []);
store.setState("weekAnalytics", []);
store.setState("monthAnalytics", []);

export const InsightsFB = (data) => {

    const loginFB = data['dataFromParent'][0];
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const APICALLFB = 'me/insights?metric=page_engaged_users,page_impressions,page_post_engagements,page_posts_impressions'
    var [analyticsFB, setAnalytics] = store.useState("analyticsFB");
    const [dayAnlyticsFB, setdayAnalytics] = store.useState("dayAnalytics");
    const [weekAnlyticsFB, setweekAnalytics] = store.useState("weekAnalytics");
    const [monthAnlyticsFB, setmonthAnalytics] = store.useState("monthAnalytics");

    useEffect(() => {

        if (loginFB !== false) {
            allInsights();
        }

    }, [ACCESS_TOKEN]);

    /*
     me/insights?metric=page_total_actions
     me/insights/page_total_actions/day
     me/insights/page_total_actions/days_28
     me/insights/page_total_actions/week

    
        FB 20749883427147142074988342714714
        Inst 17841406287465765
        page_engaged_users
        page_post_engagements
        page_impressions
        page_posts_impressions

        me/insights?metric=page_engaged_users,page_impressions,page_post_engagements,page_posts_impressions

        17841406287465765/insights?metric=impressions,reach,profile_views&period=day

        me?fields=instagram_business_account{media{id,permalink}}
       
        post
        17894903435627997/insights?metric=engagement,impressions,reach

    */

    function allInsights() {
        window.FB.api(
            APICALLFB,
            "GET",
            {
                access_token: ACCESS_TOKEN
            },
            function (response) {
                // Insert your code here
                // console.log(response);
                setAnalytics(formatFB(getAnalyticsFB(response)));
                setdayAnalytics(formatday(getAnalyticsFB(response)));
                setweekAnalytics(formatweek(getAnalyticsFB(response)));
                setmonthAnalytics(formatmonth(getAnalyticsFB(response)));
            }

        );

        function getAnalyticsFB(response) {

            var insight = response['data']
            return insight
        }

        function formatFB(insights) {

            const content = Object.keys(insights).map(key => {


                return (
                    [insights[key].name, insights[key].values, insights[key].title, insights[key].period, insights[key].description]
                );

            })
            //console.log(content)
            return content
        }

        function formatday(insights) {

            var content = Object.keys(insights).map(key => {

                if (insights[key].period === "day") {

                    return new Array(insights[key].name, insights[key].values[1]['value'], insights[key].period)

                }

            })

            var filtered = content.filter(function (x) {
                return x !== undefined;
            });


            var dataDay = new Array(filtered.map((data) => data[0]), filtered.map((data) => data[1]))

            //console.log(dataDay)
            return dataDay
        }

        function formatweek(insights) {

            //console.log(insights)
            const content = Object.keys(insights).map(key => {
                if (insights[key].period === "week") {

                    return (
                        [insights[key].name, insights[key].values, insights[key].period]
                    );
                }
            })

            var filtered = content.filter(function (x) {
                return x !== undefined;
            });

            //console.log(filtered)
            return filtered
        }

        function formatmonth(insights) {

            //console.log(insights)
            const content = Object.keys(insights).map(key => {
                if (insights[key].period === "days_28") {

                    return (
                        [insights[key].name, insights[key].values, insights[key].period]
                    );
                }
            })

            var filtered = content.filter(function (x) {
                return x !== undefined;
            });

            //console.log(filtered)
            return filtered
        }

    }


    function GetAnalyticsFB(props) {

        //console.log(props)

        const FBinsights = props.analytics;
        const listItems = FBinsights.map((insight) =>
            <>
                <br />
                <Card className='card-insightFB'>
                    <Card.Title className='text-left'>{insight[0]}</Card.Title>
                    <Card.Body>
                        <Card.Text>
                            <p className='text-left'>{insight[1][0].value},  <b>{' date: '}</b>  {insight[1][0].end_time}</p>
                            <p className='text-left'>{insight[1][1].value}, <b>{' date: '}</b> {insight[1][1].end_time}</p>

                            <div>
                                <p className='text-left'>{insight[2]}  <b>{'  Period: '}</b>  {insight[3]}</p>
                                <p className='little-text text-justify'>{insight[4]}</p>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );

        return (
            <ul>{listItems}</ul>
        );

    }

    /////////////////////chart.js/////////////////////////////////////////////////////////////////////
    const Data = [
        {
            id: 1,
            year: '2016',
            userGain: 80000,
            userLost: 823
        },
        {
            id: 2,
            year: '2017',
            userGain: 45677,
            userLost: 345
        },
        {
            id: 3,
            year: '2018',
            userGain: 78888,
            userLost: 555
        },
        {
            id: 4,
            year: '2019',
            userGain: 90000,
            userLost: 4555
        },
        {
            id: 5,
            year: '2020',
            userGain: 4300,
            userLost: 234
        }
    ];

    const froots = new Array('Piña', 'Sandia', 'Melon', 'Coco', 'Fresa', 'Mango');
    const num_froots = [1, 2, 5, 4, 20, 15];
    //const day_labels = ["page_engaged_users", "page_impressions", "page_post_engagements", "page_posts_impressions"]
    // const day_num = [0, 9, 0, 8]

    const [chartData, setChartData] = useState({
        labels: dayAnlyticsFB[0],
        datasets: [
            {
                label: "Users Gained ",
                data: dayAnlyticsFB[1],
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#50AF95",
                    "#AF5095",
                    "#baf32f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });


    //////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            {loginFB == true
                ?
                    <Row>
                        <Col xs={10} md={8} lg={4}>
                            {<GetAnalyticsFB analytics={analyticsFB} />}
                        </Col>
                        <Col xs={1} md={4} lg={8} />
                    </Row>
                :
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
            }
        </>
    );

}

export default InsightsFB;