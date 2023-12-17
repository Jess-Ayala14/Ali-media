import React, { useState } from 'react';
import { Auth, API, Storage } from 'aws-amplify';
import { Modal, Container, Row, Col, Form, Button }
    from 'react-bootstrap';

function ModalPost(props) {

    // console.log(props.onChange);

    const initialPostState = props.data[5];

    const show = props.data[0];
    const handleClose = props.data[1];
    const handlehold = props.data[2];
    const postingShow = props.data[3];

    const onImageChange = props.data[4];

    console.log(onImageChange);

    const [newPostData, setFormData1] = useState(initialPostState)
    const [img_form, setImg] = useState(props.data[6][0]);
    const [video_form, setVideo] = useState(props.data[6][1]);
    const [eImgActive, seteImgActive] = useState(props.data[6][2]);
    const [eVideoActive, seteVideoActive] = useState(props.data[6][3]);
    const [eFileActive, setefileActive] = useState(props.data[6][4]);


    return (
        <Modal show={show} onHide={handleClose}>
            <div className='modal-post'>
                <Modal.Header closeButton>
                    <Modal.Title>Post Something</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Row>
                                <Col xs={4}>
                                    <Form.Group>
                                        <Form.Check type="checkbox" name="fb_checkbox" value={newPostData.fb_checkbox} label="Facebook"
                                            onChange={e => setFormData1({ ...newPostData, 'fb_checkbox': e.target.checked })} />
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group>
                                        <Form.Check type="checkbox" name="inst_checkbox" value={newPostData.inst_checkbox} label="instagram"
                                            onChange={e => setFormData1({ ...newPostData, 'inst_checkbox': e.target.checked })} />
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group>
                                        <Form.Check type="checkbox" label="Twitter" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <br />
                            <Form.Group className="mb-3" controlId="formFileMultiple">
                                <Form.Label>Select Image</Form.Label>
                                <Form.Control type="file" name='picture' onChange={onImageChange} value={newPostData.picture} required={true} />
                                <br />
                                {img_form ?
                                    <img src={img_form} alt="" />
                                    :
                                    <></>
                                }
                                {video_form ?
                                    <video controls muted>
                                        <source src={video_form} />
                                    </video>
                                    :
                                    <></>
                                }
                                <Form.Label className={eImgActive ? "danger show" : "danger hide"}> Is not allowed Image size &gt; 8 MB</Form.Label>
                                <Form.Label className={eVideoActive ? "danger show" : "danger hide"}>Is not allowed Video size &gt; 8 GB</Form.Label>
                                <Form.Label className={eFileActive ? "danger show" : "danger hide"}> Only jpg, PNG and MP4 are allowed</Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter a Description</Form.Label>
                                <Form.Control as="textarea" rows={3} value={newPostData.description} name="description"
                                    onChange={e => setFormData1({ ...newPostData, 'description': e.target.value })} />
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={eVideoActive || eImgActive || eFileActive ? true : false} onClick={() => { handlehold(); postingShow(); }}>
                        Post
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>

    );
}

export default ModalPost;