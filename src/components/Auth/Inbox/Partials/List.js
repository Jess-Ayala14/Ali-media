import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Card, Form, InputGroup }
    from 'react-bootstrap';

import { createStore } from 'state-pool';
const store = createStore();

store.setState("Conversations", [null]);
store.setState("BusinessId", [null]);

//const initialMessageState = { text: '' };

export const List = (data) => {
    const loginFB = data['dataFromParent'][0];
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const APICALLFB = "me?fields=conversations{id,messages{message,from},participants,unread_count},business";
    const [Conversations, setConversations] = store.useState("Conversations");
    const [BusinessId, setBusinessId] = store.useState("BusinessId");
    //const [sendMessage,setFormData]=useState(initialMessageState);

    useEffect(() => {
        if (loginFB !== false) {

            allConversations();
        }

    }, [ACCESS_TOKEN]);


    function getAbbreviation(name) {
        if (!name) return ""; // Si no hay nombre, devolver cadena vacía
        const words = name.split(" ");
        const initials = words.map(word => word.charAt(0).toUpperCase());
        return initials.join(" "); // Une las iniciales sin espacios
    }

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
                setBusinessId(getBusinessId(response));
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
                    [
                        conversations[key].id != null ? conversations[key].id : null,
                        conversations[key].messages != null ? conversations[key].messages['data'] : null,
                        conversations[key].participants != null ? conversations[key].participants['data'][0]['name'] : null,
                        conversations[key].unread_count != null ? conversations[key].unread_count : null,
                        conversations[key].participants != null ? conversations[key].participants['data'][0]['id'] : null,
                    ]
                );

            })

            var filtered = content.filter(function (x) {
                return x !== undefined;
            });

            return filtered;
        }

        function getBusinessId(response) {
            var id = response['business']['id']
            return id;
        }


    }

    function GetConversations() {
        var listItems;
        var link;

        if (!Conversations || !link) {
            listItems = Conversations.map((conversation) =>
                <>
                    {
                        conversation != null &&
                        <>
                            <Nav.Item className='md-lg'>
                                <Nav.Link className='text-left' eventKey={conversation[0]}><h8>{conversation[2]}<b>{"  " + conversation[3]}</b></h8></Nav.Link>
                            </Nav.Item>

                            <Nav.Item className='xs-sm'>
                                <Nav.Link className='text-left' eventKey={conversation[0]}><h8>{getAbbreviation(conversation[2])}<b>{"  " + conversation[3]}</b></h8></Nav.Link>
                            </Nav.Item>
                        </>
                    }
                </>

            );

            link =
                <>
                    <Nav.Item>
                        <Nav.Link href={"https://business.facebook.com/latest/inbox/all/?business_id=" + BusinessId} className="text-left" target="_blank" eventKey="main">
                            Meta for Business
                        </Nav.Link>
                    </Nav.Item>
                </>;
        }

        return (
            listItems && link ?
                <ul>{link}
                    {listItems}
                </ul>
                :
                <>
                </>

        );
    }

    /*  async function onChange(e) {
        if(!e.target.value.text)return
        setFormData  
          
      }
     
      */

    function TabConversation() {

        const listItems = Conversations.map((conversation) =>
            <>{conversation != null &&
                <Tab.Pane eventKey={conversation[0]}>
                    <Tab.Container className="text-left">
                        <Container className='container-message'>
                            <Row className='row-80'>
                                {conversation[1] != null ?
                                    conversation[1].map((key) =>
                                        key['message'] != "" &&
                                        <Card>
                                            <Card.Body>
                                                <b>{key['from']['name'] + ": "}</b><h8>{key['message']}</h8>
                                                <br /><br />
                                            </Card.Body>
                                        </Card>
                                    ).reverse()
                                    :
                                    <Card>
                                        <Card.Body>
                                            <b>No messages</b>
                                        </Card.Body>
                                    </Card>
                                }
                            </Row>
                            <Row className='row-20'>
                                <Card>
                                    <Card.Body>
                                        <InputGroup className="mb-3">
                                            <Form>
                                                <Form.Control /*
                                                    placeholder="Write a message"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    onChange={setFormData1({...messageData,'text': e.target.value})}*/
                                                />
                                                <Form.Label>Please write a message</Form.Label>
                                            </Form>
                                            <Button variant="outline-secondary" id="button-addon2" onClick={() => { /*tryToSend(); */ }}>
                                                Send
                                            </Button>
                                        </InputGroup>
                                    </Card.Body>
                                </Card>
                            </Row>
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
                        <Container className="container-message">
                            <br />
                            <Row className='Row-80'>
                                <Col xs={3} sm={3} md={2} lg={2} />
                                <Col md={8} className='text-center'>
                                    <h4>No Chat Selected</h4>
                                </Col>
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
                <Row>
                    
                        <Col xs={4} sm={4} md={2} lg={2}>
                            <Nav variant="pills" className="flex-column">
                                <GetConversations data={{ conversation: Conversations, business: BusinessId }} />
                            </Nav>
                        </Col>
                        <Col className="Inbox-col-tab" xs={8} sm={8} md={9} lg={9}>
                            <Row className='messages-content'>
                                <Row className='card-insingt'>
                                    {<TabConversation conversations={Conversations} />}
                                </Row>
                            </Row>
                        </Col>
                    
                </Row>
                :
                <>
                    <Col xs={7} md={3} lg={2} />
                    <Col className="Inbox-col-tab" xs={8} sm={8} md={9} lg={9}>
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