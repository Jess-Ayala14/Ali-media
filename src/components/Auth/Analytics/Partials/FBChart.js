import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Card }
    from 'react-bootstrap';
import Daychart from './FB/DayChart';
import Weekchart from './FB/WeekChart';
import MonthChart from './FB/MonthChart';

export const FBChart = (data) => {
    const loginFB = data['dataFromParent'][0];
    const ACCESS_TOKEN = data['dataFromParent'][1];

    return (
        <> {loginFB == true
            ?
            <div>
                <Container>
                    <br />
                    <Daychart dataFromParent={[loginFB, ACCESS_TOKEN]} />
                    <Weekchart dataFromParent={[loginFB, ACCESS_TOKEN]} />
                    <MonthChart dataFromParent={[loginFB, ACCESS_TOKEN]} />
                </Container>
            </div>
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



export default FBChart;
