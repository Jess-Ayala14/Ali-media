import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import InsightsFB from './Partials/InsightsFB';
import FBChart from './Partials/FBChart';
import InsightsInst from './Partials/InsightsInst';
import InstChart from './Partials/InstChart';
import { Container, Row, Col, Tab, Nav, Button, Card } from 'react-bootstrap';
import { createStore } from 'state-pool';
import './Analytics.css';

const store = createStore();
store.setState("token", '');

const Analytics = () => {

    let [state, setState] = useState(null);
    const [loginFB, setLoginFB] = useState(false);
    const [access_token, setAccessToken] = store.useState("token");

    useEffect(() => {
        scriptFB();

        if (loginFB && access_token === '') {
            queryToken();
        }

        (async () => {
            try {
                const response = await Auth.currentAuthenticatedUser();
                setState(response);
            } catch (err) {
                console.error(err);
                setState(null);
            }
        })();
    }, [loginFB, access_token]);

    function queryToken() {
        window.FB.api(
            "me?fields=accounts{access_token}",
            "GET",
            function (response) {
                const token = response?.accounts?.data[0]?.access_token;
                if (token) {
                    setAccessToken(token);
                } else {
                   // console.log('No se pudo obtener el token de Facebook');
                }
            }
        );
    }

    function scriptFB() {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "801174264382809",
                cookie: true,
                xfbml: true,
                version: 'v19.0'
            });

            window.FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });
        };

        function checkLoginState() {
            window.FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });
        }

        function statusChangeCallback(response) {
            if (response.status === 'connected') {
                //console.log('Logged in and authenticated');
                // Obtener el token de acceso de la respuesta
                window.FB.api('/me?fields=accounts{access_token}', function (fbResponse) {
                    const token = fbResponse?.accounts?.data[0]?.access_token;
                    if (token) {
                        setLoginFB(true);
                        setAccessToken(token);
                    } else {
                       // console.log('No se pudo obtener el token de Facebook');
                    }
                });
            } else {
                console.log('Not authenticated');
                setLoginFB(false);
                setAccessToken('');
            }
        }

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0&appId=801174264382809&autoLogAppEvents=1";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    return (
        <div className='Analytics'>
            <Container>
                <br />
                <Row className='Insights'>
                    <Col xs={1}/>
                    <Col xs={10}>
                    <Tab.Container defaultActiveKey="facebook-insight">
                        <Nav variant="pills" defaultActiveKey="facebook-insight">
                            <Nav.Item>
                                <Nav.Link className='facebook' eventKey="facebook-insight">Facebook</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='facebook' eventKey="fbChart-insight">FB Charts</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='instagram' eventKey="instagram-insight">Instagram</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='instagram' eventKey="instaChart-insight">Inst Charts</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <div className='socialM-content'>
                            <Tab.Content>
                                <Tab.Pane eventKey="facebook-insight">
                                    <InsightsFB dataFromParent={[loginFB, access_token]} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fbChart-insight">
                                    <FBChart dataFromParent={[loginFB, access_token]} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="instagram-insight">
                                    <InsightsInst dataFromParent={[loginFB, access_token]} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="instaChart-insight">
                                    <InstChart dataFromParent={[loginFB, access_token]} />
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </Tab.Container>
                    </Col>
                    <Col xs={1}/>
                </Row>
            </Container>
        </div>
    );
}

export default withAuthenticator(Analytics);
