import React, { useEffect } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Card }
    from 'react-bootstrap';

import { createStore } from 'state-pool';
const store = createStore();

store.setState("Conversations", [null]);

export const List = (data) => {
    const loginFB = data['dataFromParent'][0];
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const APICALLFB = "me?fields=conversations{id,messages{message,from},participants}";
    const [Conversations, setConversations] = store.useState("Conversations");

    useEffect(() => {
        if (loginFB !== false) {

            allConversations();
        }

    }, [ACCESS_TOKEN]);

    function allConversations() {
        window.FB.api(
            APICALLFB,
            "GET",
            {
                access_token: ACCESS_TOKEN
            },
            function (response) {
                // Insert your code here
                //console.log(response);
                setConversations(format(getConversation(response)));
            }

        );

        function getConversation(response) {
            var conversations = response['conversations']['data'];
            return conversations;
        }

        function format(conversations) {
            //console.log(conversations);

            const content = Object.keys(conversations).map(key => {
                return (
                    [conversations[key].id, conversations[key].messages['data'], conversations[key].participants['data'][0]['name']]
                );

            })

            var filtered = content.filter(function (x) {
                return x !== undefined;
            });

            return filtered;
        }
    }

    function GetConversations(props) {
        //console.log(props);

        const conversations = props.conversations;
        const listItems = conversations.map((conversation) =>
            <>{conversation != null &&
                <Nav.Item>
                    <Nav.Link className='text-left' eventKey={conversation[0]}><h8>{conversation[2]}</h8></Nav.Link>
                </Nav.Item>
            } </>

        );

        return (
            <ul>{listItems}</ul>
        );
    }

    function TabConversation(props) {
        console.log(props);
        const conversations = props.conversations;
        const listItems = conversations.map((conversation) =>
            <>{conversation != null &&
                <Tab.Pane eventKey={conversation[0]}>
                    <Tab.Container className="text-left">
                        <Container>
                            {conversation[1].map((key) =>
                                key['message'] != "" &&
                                <><b>{key['from']['name'] + ": "}</b><h8>{key['message']}</h8><br /><br /></>
                            ).reverse()}
                        </Container>
                    </Tab.Container>
                </Tab.Pane>
            }
            </>
        );

        return (
            <>
                <Tab.Pane eventKey="main">
                    <Tab.Container className="text-center">
                        <Container>
                            <Row>
                                <Col md={2} />
                                <Col md={8}>
                                    <h4>No Chat Selected</h4>
                                </Col>
                                <Col md={2} />
                            </Row>
                        </Container>
                    </Tab.Container>
                </Tab.Pane>
                <ul>{listItems}</ul>
            </>
        );
    }

    return (
        <>
            {loginFB == true
                ?
                <>
                    <Col xs={6} md={3} lg={2}>
                        <Nav variant="pills" className="flex-column">
                            <GetConversations conversations={Conversations} />
                        </Nav>
                    </Col>
                    <Col className="Inbox-col-tab" xs={0} sm={9} md={9} lg={8}>
                        <Row className='messages-content'>
                            <Row className='card-insingt'>
                                {<TabConversation conversations={Conversations} />}
                            </Row>
                        </Row>
                    </Col>
                </>
                :
                <>
                    <Col xs={6} md={3} lg={2} />
                    <Col className="Inbox-col-tab" xs={0} sm={9} md={9} lg={8}>
                        <Row className='messages-content'>
                            <Row className="card-insight">
                                <Col xs={1} md={3} lg={4} />
                                <Col xs={10} md={6} lg={4}>
                                    <br />
                                    <Card className="card-insightFB">
                                        <Card.Body className='text-center'>
                                            <Card.Text>
                                                Please Login on Facebook
                                            </Card.Text>
                                            <Button href='/Settings' className="btn-instagram">Go to settings</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={1} md={3} lg={4} />
                            </Row>
                        </Row>
                    </Col>
                </>
            }
            <br />
            <Col className='hide' md={3} lg={2}>
            </Col>
        </>

    );

}

export default List;