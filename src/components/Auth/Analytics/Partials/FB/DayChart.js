import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Chart from "react-apexcharts";
import { createStore } from 'state-pool';

const store = createStore();
store.setState("analyticsFB", []);
store.setState("dayAnalytics", []);

export function Daychart(data) {
    const loginFB = data['dataFromParent'][0];
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const APICALLFB = 'me/insights?metric=page_impressions,page_post_engagements,page_daily_follows,page_total_actions';
    const [dayAnalyticsFB, setDayAnalytics] = useState([]);
    const [loading, setLoading] = useState(true); // Indicador de carga de los datos
    const [error, setError] = useState(false); // Indicador de error en la carga de datos

    useEffect(() => {
        if (loginFB !== false && ACCESS_TOKEN) {
            setLoading(true);
            setError(false);
            allInsights();
        }
    }, [loginFB, ACCESS_TOKEN]); // Se asegura de que se actualice si cualquiera cambia

    function allInsights() {
        window.FB.api(
            APICALLFB,
            "GET",
            { access_token: ACCESS_TOKEN },
            function (response) {
                if (response && response.data) {
                    setDayAnalytics(formatDay(getAnalyticsFB(response)));
                    setLoading(false);
                } else {
                    setError(true);
                    setLoading(false);
                }
            }
        );
    }

    function getAnalyticsFB(response) {
        return response['data'];
    }

    function formatDay(insights) {
        // Revisa y filtra los datos de insights
        var content = Object.keys(insights).map(key => {
            if (insights[key].period === "day") {
                return [
                    insights[key].name || 'no data',
                    insights[key].values && insights[key].values[0] ? insights[key].values[0]['value'] : [0],
                    insights[key].period || 'no data'
                ];
            }
        });

        // Eliminar los valores `undefined` o vacíos
        var filtered = content.filter(x => x !== undefined);

        // Extraer y separar las categorías y los valores
        var dataDay = [
            filtered.map(data => data[0]), // Categorías
            filtered.map(data => data[1])  // Valores
        ];

        return dataDay;
    }

    // Datos para el gráfico
    const state = {
        options: {
            chart: { id: "basic-bar" },
            xaxis: { categories: dayAnalyticsFB[0] || [0] }, // Asegura que haya categorías
            colors: ['#EB8C87'],
        },
        series: [
            {
                name: "series-1",
                data: dayAnalyticsFB[1] || [0], // Asegura que haya datos
            }
        ]
    };

    // Condicional de carga o error
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data. Please try again.</div>;
    }

    return (
        <>
            {loginFB === true ?
                <div>
                    <Row>
                        <Col xs={1} md={3} lg={4} />
                        <Col xs={10} md={6} lg={4}>
                            <h5>Last 24 hrs</h5>
                            <Chart options={state.options} series={state.series} type="bar" />
                        </Col>
                        <Col xs={1} md={3} lg={4} />
                    </Row>
                </div>
                : <div>Please log in to see the charts.</div>
            }
        </>
    );
}

export default Daychart;
