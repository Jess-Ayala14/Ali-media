import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Card }
    from 'react-bootstrap';
import Daychart from './Inst/DayChart';
import Weekchart from './Inst/WeekChart';
import Monthchart from './Inst/MontthChart';


export const InstChart = (data) => {
    const loginFB = data['dataFromParent'][0];
    const ACCESS_TOKEN = data['dataFromParent'][1];


    return (
        <>
            {loginFB == true
                ?
                <div>
                    <Container>
                        <br/>
                        <Daychart dataFromParent={[loginFB, ACCESS_TOKEN]} />
                        <Weekchart dataFromParent={[loginFB, ACCESS_TOKEN]} />
                        <Monthchart dataFromParent={[loginFB, ACCESS_TOKEN]} />

                    </Container>
                </div>
                :
                <Row className="card-insight">
                    <Col xs={1} md={3} lg={4} />
                    <Col xs={10} md={6} lg={4}>
                        <br />
                        <Card className="card-insightInst">
                            <Card.Body className='text-center'>
                                <Card.Text>
                                    Please Authorize Instagram
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



export default InstChart;
