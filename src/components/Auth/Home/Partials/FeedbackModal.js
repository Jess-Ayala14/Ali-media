import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FeedbackModal = ({ show, onClose, message }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FeedbackModal;
