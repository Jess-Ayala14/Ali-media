import React, { createElement, useRef, useEffect, useState } from 'react';
import Files from './Partials/Files';
import Posted from './Partials/Posted';
import Drafts from './Partials/Drafts';
import { Auth, API, Storage } from 'aws-amplify';
import { Loader } from '@aws-amplify/ui-react';
import { Container, Row, Col, Tab, Button, Modal, Offcanvas, Nav, Form, Card, Pagination, Label }
    from 'react-bootstrap';
import './Home.css';
import { listBusinesses } from '../../../graphql/queries';
import { createBusiness as createBusinessMutation }
    from '../../../graphql/mutations';
import { createStore } from 'state-pool';
import NewPost from './Partials/NewPost';
import ModalPost from './Partials/ModalPost';
import ModalLoading from './Partials/ModalLoading';
import loadimg from '../../../storage/loader.gif';
const store = createStore();
store.setState("token", '');

const initialFormState = { name: '', about: '', image: '', phone: '' };
const initialPostState = { description: '', picture: '', fb_checkbox: false, inst_checkbox: false };

const Home = () => {


    const [formData, setFormData] = useState(initialFormState);
    const [newPostData, setFormData1] = useState(initialPostState);
    let [state, setState] = useState(null);
    const [business, setBusiness] = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);
    const handlehold = () => setShow(false);
    const postingClose = () => setShow1(false);
    const carreteClose2 = () => setShow2(false);
    const [loginFB, setlogin] = useState(false);
    const [access_token, savingtoken] = store.useState("token")
    const [img_form, setImg] = useState(false);
    const [video_form, setVideo] = useState(false);
    const [img_profile, setImg_profile] = useState();
    const [eImgActive, seteImgActive] = useState(false);
    const [eVideoActive, seteVideoActive] = useState(false);
    const [eFileActive, setefileActive] = useState(false);
    const fVariableState = [img_form, video_form, eImgActive, eVideoActive, eFileActive];



    useEffect(() => {
        fetchBusiness();
        scriptFB();

        if (loginFB === true && access_token === '') {
            queryToken()
        }

        (async () => {
            try {
                const response = await Auth.currentAuthenticatedUser()
                setState(response)
            } catch (err) {
                console.error(err)
                setState(null)
            }
        })()

    }, [loginFB]);

    //////////////////////////////////API FACEBOOK////////////////////////////////////////////////////

    function queryToken() {

        window.FB.api(
            "me?fields=accounts{access_token,name}",
            "GET",

            function (response) {
                // Insert your code here
                console.log(response)
                response = response["accounts"]['data'][0]['access_token']

                getToken(response)
            }

        );
    }

    function getToken(token) {
        savingtoken(token)
        console.log(access_token)
    }


    ///////////////Modal Post//////////////////////////////////////////////////////
    const handleClose = () => {
        setShow(false);
        seteImgActive(false);
        seteVideoActive(false);
        setefileActive(false);
        newPostData.description = '';
        newPostData.picture = '';
        newPostData.fb_checkbox = '';
        newPostData.inst_checkbox = ''
        setImg('');
        setVideo('');

    }
    ////////////////Modal Loadind_Post////////////////////////////////////////////////////////////////
    const postingShow = () => {
        if (newPostData.fb_checkbox === true || newPostData.inst_checkbox === true) {

            if (newPostData.description == "") {
                alert("Select a image/video file")
                handleClose()
            }
            else {
                setShow1(true);
                setTimeout(function () {
                    NewPost(newPostData, access_token);
                }, 2500)
            }

        }
        else if (newPostData.picture === "") {
            alert("Select a image/video file1")
            handleClose()
        }
        else {
            alert("Check at least one option")
            handleClose()
        }

    }

    /////////////////////////////////////////////SCRIPT SDK //////////////////////////////////////////////////
    const scriptFB = () => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "801174264382809",
                cookie: true,
                xfbml: true,
                version: 'v15.0'
            });

            window.FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });


        };


        function statusChangeCallback(response) {
            if (response.status === 'connected') {
                console.log('Logged in and authenticated');
                setlogin(true);

                // testAPI();
            } else {
                console.log('Not authenticated');
                setlogin(false);

            }

        }

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0&appId=801174264382809&autoLogAppEvents=1";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


    }

    if (loginFB === true && access_token === '') {
        queryToken()
    }


    scriptFB();
    //scriptChat();
    //checkLoginState();
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const format = (variable) => {
        var data = variable
        data = data.split('"')
        data = data[1]
        data = data.charAt(0).toUpperCase() + data.slice(1);
        return (data)
    }

    async function fetchBusiness() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        await Promise.all(BusinessFromAPI.map(async business => {
            if (business.image) {
                Storage.configure({ level: 'private' })
                const image = await Storage.get('Profile/Pic_Profile')
                business.image = image
            }
            return business
        }))
        setBusiness(apiData.data.listBusinesses.items);
    }

    async function createBusiness() {
        if (!formData.name || !formData.about) return;
        await API.graphql({ query: createBusinessMutation, variables: { input: formData } });
        if (formData.image) {
            const image = await Storage.get(formData.image);
            formData.image = image;
        }

        setBusiness([...business, formData]);
        setFormData(initialFormState);
        window.location.reload();
    }

    async function onChange(e) {
        if (!e.target.files[0].name) return
        setFormData({ ...formData, "image": e.target.files[0].name });
        const [file] = e.target.files;
        setImg_profile(URL.createObjectURL(file));
        Storage.configure({ level: 'private' })
        await Storage.put("Profile/Pic_Profile", file,
            {
                contentType: "image/png"
            });

        fetchBusiness();
    }

    //e => setFormData1({ ...newPostData, 'description': e.target.value })}
    const onImageChange = (e) => {

        //console.log("Im inside");

        const ImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        const videoTypes = ['video/mp4', 'video/mkv'];

        if (!e.target.files[0].name) return
        setFormData1({ ...newPostData, "picture": e.target.value });
        const [file] = e.target.files;
        if (ImageTypes.includes(file["type"])) {
            if (e.target.files[0].size < (8 * 1048576)) {
                setImg(URL.createObjectURL(file))
                seteImgActive(false)
                setefileActive(false)
            }
            else {
               // console.log("invalid File 1")
                seteImgActive(true)
            }
        }
        else if (videoTypes.includes(file["type"])) {

            if (e.target.files[0].size < (88 * 1048576)) {
                setVideo(URL.createObjectURL(file))
                seteVideoActive(false)
                setefileActive(false)
            }
            else {
                //console.log("invalid File 2")
                seteVideoActive(true)
            }
        }
        else {
           // console.log("File no Valid")
            setefileActive(true)
        }
        console.log(e.target.files[0].size)

        Storage.configure({ level: 'private' })
        Storage.put("temp/" + e.target.files[0].name, file, {
            contentType: "image/jpeg" || "image/png" || "video/mp4" || "video/mkv",
        });


    }

    const Table = () => {
        if (business.map(business => business.id) != "")
            return true
        else
            return false
    }

    if (!state) return <Loader />

    return (
        <div className='Home' >
            {Table() ?
                <Container>
                    <div>
                        <br />
                        <Row className='row-tab-md-lg'>
                            <Tab.Container id="left-tabs-example" defaultActiveKey="posted">
                                <Col xs={6} md={3} lg={2}>
                                    <Card>
                                        {business.map(business => (
                                            <Card.Body>
                                                <Card.Title>{business.name}</Card.Title>
                                                <Card.Text>
                                                    <img className='profile_img' src={business.image} alt="profile" />
                                                </Card.Text>
                                                <Card.Subtitle className='text-left'>{business.about}</Card.Subtitle>
                                            </Card.Body>
                                        ))}
                                    </Card>
                                    <br />
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="posted">Posted</Nav.Link>
                                        </Nav.Item>
                                        {/*<Nav.Item>
                                            <Nav.Link eventKey="files">Files</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="drafts">Draft</Nav.Link>
                                        </Nav.Item>*/}
                                    </Nav>
                                </Col>
                                <Col className="Home-col-tab" xs={0} sm={9} md={9} lg={8}>
                                    <Row>
                                        <Col xs={7} lg={9} />
                                        <Col xs={5} lg={3}>
                                            <Button variant="primary" onClick={handleShow} disabled={loginFB === false ? true : ""}>
                                                New Post
                                            </Button>
                                            {/*<Button variant="success" onClick={handleShow2} disabled={loginFB === false ? true : ""}>
                                                Carrete
                                            </Button>*/}
                                        </Col>
                                    </Row>
                                    <Tab.Content>
                                        <Posted dataFromParent={[loginFB, access_token]} />
                                        <Files dataFromParent={loginFB} />
                                        <Drafts dataFromParent={loginFB} />
                                    </Tab.Content>
                                </Col>
                                <br />
                                <Col className='hide' md={3} lg={2}>
                                </Col>
                            </Tab.Container>
                        </Row>
                        <div className='row-tab-xs-xl'>
                            <Row>
                                <Col xs={6} md={3} lg={2}>
                                    <Card>
                                        {business.map(business => (
                                            <Card.Body>
                                                <Card.Title>{business.name}</Card.Title>
                                                <Card.Text>
                                                    <img className='profile_img' src={business.image} alt="profile" />
                                                </Card.Text>
                                                <Card.Subtitle className='text-left'>{business.about}</Card.Subtitle>
                                            </Card.Body>
                                        ))}
                                    </Card>
                                </Col>
                                <Col xs={4} md={6} lg={7}>
                                    <Button variant="primary" onClick={handleShow} disabled={loginFB === true ? "" : true}>
                                        New Post
                                    </Button>
                                </Col>
                                <Col xs={2} md={3} lg={3} />
                            </Row>
                            <br />
                            <Tab.Container defaultActiveKey="posted">
                                <Row className='responsive'>
                                    <Nav variant="tabs">
                                        <Col xs={1} sm={1} />
                                        <Col xs={3} sm={3}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="posted">Posted</Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                        {/*
                                        <Col xs={3} sm={3}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="files">Files</Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                        <Col xs={3} sm={3}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="drafts">Draft</Nav.Link>
                                            </Nav.Item>
                                        </Col>*/}
                                    </Nav>
                                </Row>
                                <Row className='responsive-content'>
                                    <Col xs={0} sm={1} />
                                    <Col className="Home-col-tab" xs={12} sm={10} md={10} lg={8}>
                                        <Tab.Content>
                                            <Posted dataFromParent={[loginFB, access_token]} />
                                            <Files dataFromParent={loginFB} />
                                            <Drafts dataFromParent={loginFB} />
                                        </Tab.Content>
                                    </Col>
                                    <Col xs={0} sm={1} />
                                </Row>
                            </Tab.Container>
                        </div>
                    </div>
                </Container>
                :
                <Container className="business_form">
                    <div>
                        <br />
                        <Row>
                            <Col sm={1} md={2} lg={3} />
                            <Col sm={10} md={8} lg={6}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Welcome to Ali-Media Tools</Card.Title>
                                    </Card.Header>
                                    <Tab.Container defaultActiveKey="first">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <Card.Body>
                                                    <Row className="justify-content-md-center">
                                                        <Col md={10} sm={12} lg={8} >
                                                            <p>
                                                                Hello {format(JSON.stringify(state["username"]))},
                                                                welcome to Ali-Media-Tools. Thank you for accepting
                                                                to participate: you have been invited to probe this
                                                                functional prototype, which consists add multiple
                                                                fuctions of your favorites social media. On this site,
                                                                you could post and watch your history post from Facebook,
                                                                also Instagram, and Twitter at the same point.
                                                            </p>
                                                            <br />
                                                            <h4>Please press next</h4>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <Card.Body>
                                                    <Form>
                                                        <Row className="justify-content-md-center">
                                                            <Col md={10} sm={12} lg={8}>
                                                                <Form>
                                                                    <Form.Label><h4>Tell us About your Business: *</h4></Form.Label>
                                                                    <Form.Control type="text" onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                                                        placeholder="Type your Business name *" value={formData.name} required />
                                                                    <br />
                                                                    <Form.Control type="text" onChange={e => setFormData({ ...formData, 'about': e.target.value })}
                                                                        placeholder="Describe your Business *" value={formData.about} required />
                                                                    <br />
                                                                    <Form.Control type="tel" onChange={e => setFormData({ ...formData, 'phone': e.target.value })}
                                                                        placeholder="Enter a Phone Number" value={formData.phone} />
                                                                    <br />
                                                                    <Form.Control type="file" onChange={onChange} required={true} />
                                                                    <img src={img_profile} alt="" />
                                                                    <br />
                                                                    <Button onClick={createBusiness}>Save Data</Button>
                                                                </Form>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </Card.Body>
                                            </Tab.Pane>
                                            <br />
                                            <Card.Footer>
                                                <Card.Text>

                                                    <Nav className="justify-content-center">
                                                        <Pagination.Item eventKey="first">
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="first">{"<"}</Nav.Link>
                                                            </Nav.Item>
                                                        </Pagination.Item>
                                                        <Pagination.Item eventKey="second">
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="second">{">"}</Nav.Link>
                                                            </Nav.Item>
                                                        </Pagination.Item>
                                                    </Nav>

                                                </Card.Text>
                                            </Card.Footer>
                                        </Tab.Content>
                                    </Tab.Container>

                                </Card>
                            </Col>
                            <Col sm={1} md={2} lg={6} />
                        </Row>
                    </div>
                </Container >
            }

            {/* Modal*/}


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
                                        {/*
                                        <Form.Group>
                                            <Form.Check type="checkbox" label="Twitter" />
                                        </Form.Group>*/}
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

            <ModalLoading data={[show1, postingClose]} />
            {/*
            <Modal show={show2} onHide={carreteClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Post a Carousell</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
                                </Modal>*/}
        </div >
    )
}

export default Home