import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Chart from "react-apexcharts";
import { createStore } from 'state-pool';

const store = createStore();
store.setState("analyticsFB", []);
store.setState("weekAnalytics", []);


export function Weekchart(data) {
    const loginFB = data['dataFromParent'][0];
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const APICALLFB = 'me/insights?metric=page_impressions,page_post_engagements,page_daily_follows,page_total_actions';
    const [weekAnlyticsFB, setweekAnalytics] = useState([]);

    // Usamos `useEffect` con `loginFB` y `ACCESS_TOKEN` como dependencias
    useEffect(() => {
        if (loginFB !== false) {
            allInsights();
        }
    }, [ACCESS_TOKEN, loginFB]); // Agregar loginFB como dependencia

    // Función para obtener y procesar los datos de la API de Facebook
    function allInsights() {
        window.FB.api(
            APICALLFB,
            "GET",
            { access_token: ACCESS_TOKEN },
            function (response) {
                if (response && response.data) {
                    setweekAnalytics(formatday(getAnalyticsFB(response)));
                } else {
                    console.error("Error fetching data from Facebook API.");
                }
            }
        );
    }

    // Función para extraer los insights de la respuesta de la API
    function getAnalyticsFB(response) {
        return response['data']; // Devolver solo los datos necesarios
    }

    // Función para formatear los datos según el período "week"
    function formatday(insights) {
        const content = Object.keys(insights).map(key => {
            const insight = insights[key];
            if (insight.period === "week" && insight.values && insight.values[0]) {
                return [
                    insight.name || 'no data', // Si no hay nombre, poner 'no data'
                    insight.values[0]['value'] || [0], // Si no hay valor, poner 0
                    insight.period || 'no data' // Si no hay período, poner 'no data'
                ];
            }
        });

        // Filtrar valores undefined
        const filtered = content.filter(x => x !== undefined);

        // Extraer las categorías y los valores
        const dataWeek = [
            filtered.map(data => data[0]), // Nombres de los insights
            filtered.map(data => data[1])  // Valores de los insights
        ];

        return dataWeek;
    }

    // Definimos las opciones y los datos para el gráfico
    const state = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: weekAnlyticsFB[0] // Usamos las categorías extraídas de los datos
            },
            colors: ['#8CEB87'],
        },
        series: [
            {
                name: "series-1",
                data: weekAnlyticsFB[1] // Usamos los valores extraídos de los datos
            }
        ]
    };

    return (
        <>
            {loginFB === true
                ? <div>
                    <Row>
                        <Col xs={1} md={3} lg={4} />
                        <Col xs={10} md={6} lg={4}>
                            <h5>This Week</h5>
                            <Chart options={state.options} series={state.series} type="bar" />
                        </Col>
                        <Col xs={1} md={3} lg={4} />
                    </Row>
                </div>
                : <div> {/* Aquí podrías agregar un mensaje o una pantalla de carga si es necesario */} </div>
            }
        </>
    );
}

export default Weekchart;
