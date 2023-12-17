import React from 'react';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';

function ModalDelPost(props) {

    const show = props.data[0];
    const handleClose = props.data[1];
    const Del_posts = props.data[2];
    const OffData = props.data[3];

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure to delete this post?</p>
            </Modal.Body>
            <Modal.Footer>

                <Col xs={2}>
                    <Button variant="outline-dark" onClick={handleClose}>Close</Button>
                </Col>

                <Col xs={2}>
                    <Button variant="danger" onClick={() => Del_posts(OffData[0])}>Sure</Button>
                </Col>

            </Modal.Footer>
        </Modal>
    );
}

export default ModalDelPost;