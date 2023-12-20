import React, { useState } from 'react'
import { Container, Row, Col, Tab, Button, Modal }
    from 'react-bootstrap';
import fb_ins_logo from '../../../../storage/fb-ins.png';


const Socialn = (props) => {

    const loginFB = props.data[0];
    const logoutFB = props.data[1];
    const onLoginFB = props.data[2];
    const [show, setShow] = useState(false);
        const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    

    return (
        <Tab.Pane eventKey="Social">
            {console.log(loginFB)}
            <Container>
                <div className='socialn-list'>
                    <Row className="justify-content-md-center">
                        <Col className='text-center'>
                            <img src={fb_ins_logo} />
                            <br />
                            <Row>
                                <Col className='text-center'>
                                    <Button
                                        variant="primary"
                                        onClick={handleShow}
                                        className={`${loginFB ? 'hide-button' : 'show-button'}`}
                                    >
                                        Pair
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-center'>
                                    <Button className={`${loginFB === true ? 'show-button' : 'hide-button'}`} onClick={logoutFB} >
                                        Log out
                                    </Button>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </div>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Facebook Authorization</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    As a Guest to test this functional prototype
                    of the degree project for social networks and
                    with the purpose of incorporating them into it.
                    You authorize the use of Facebook from this website,
                    you will authorize the API: Facebook for Developers,
                    authenticating as you do on Facebook. This website
                    could save certain credentials to avoid repeating this
                    process, without the need to save your password and
                    user of the Facebook social network.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button onClick={onLoginFB}>
                        Login FB
                    </Button>

                </Modal.Footer>
            </Modal>
        </Tab.Pane>
    )
}


export default Socialn;