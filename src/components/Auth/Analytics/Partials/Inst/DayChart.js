import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Chart from "react-apexcharts";

export function Daychart(data) {

    const loginFB = data['dataFromParent'][0];
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const APICALLInst = 'me?fields=instagram_business_account{id}'
    const APICALLInst1 = '/insights?metric=impressions,reach,profile_views&period=day'
    const [dayAnalyticsInts, setDayAnalytics] = useState([]);
    const [loading, setLoading] = useState(true); // Indicador de carga de los datos
    const [error, setError] = useState(false); // Indicador de error en la carga de datos


    useEffect(() => {

        if (loginFB !== false && ACCESS_TOKEN) {
            setLoading(true);
            setError(false);
            allInsights();
        }

    }, [loginFB, ACCESS_TOKEN]);

    function allInsights() {
        window.FB.api(
            APICALLInst,
            "GET",
            {
                access_token: ACCESS_TOKEN
            },
            function (response) {

                seconCallInst(response['instagram_business_account']['id']);

            }

        );

        function seconCallInst(id_inst) {
            window.FB.api(
                id_inst + APICALLInst1,
                "GET",
                { access_token: ACCESS_TOKEN },
                function (response) {
                    if (response && response.data) {

                        setDayAnalytics(formatDay(getAnalyticsInst(response)))
                        setLoading(false);
                    } else {
                        setError(true);
                        setLoading(false);
                    }
                }
            )
        }

        function getAnalyticsInst(response) {
            return response['data'];
        }

        function formatDay(insights) {

            var content = Object.keys(insights).map(key => {
                if (insights[key].period === "day") {
                    return [
                        insights[key].name != null ? insights[key].name : ['no data'],
                        insights[key].period != null ? insights[key].period : ['no data'],
                        insights[key].values && insights[key].values[0] ? insights[key].values[0]['value'] : [0],
                        insights[key].title != null ? insights[key].title : ['no data'],
                        insights[key].description != null ? insights[key].description : ['no data']
                    ];
                }
            });

            var filtered = content.filter(x => x !== undefined);


            var dataday = [
                filtered.map(data => data[0]),
                filtered.map(data => data[2])
            ];

            return dataday;

        }
    }

    const state = {

        options: {
            chart: { id: "basic-bar" },
            xaxis: { categories: dayAnalyticsInts[0] || [0] },
            colors: ['#EB8C87'],
        },
        series: [
            {
                name: "series-1",
                data: dayAnalyticsInts[1] || [0]
            }
        ]
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data. Please try again.</div>;
    }

    return (
        <>
            {loginFB == true
                ?
                <div>
                    <Row>
                        <Col xs={1} md={6} lg={4} />
                        <Col xs={10} md={6} lg={4}>
                            <h5>Last 24 hrs</h5>
                            <Chart options={state.options} series={state.series} type="bar" />
                        </Col>
                        <Col xs={1} md={3} lg={4} />
                    </Row>

                </div>
                : <div>

                </div>
            }
        </>
    );
}

export default Daychart;