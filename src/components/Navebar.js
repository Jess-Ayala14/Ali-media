import React, { Component } from 'react';
import { Navbar, Container, Nav, NavDropdown, Col, Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import './Navebar.css';
import logo_site from '../storage/logo.png';

class Navebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: props.auth.isAuthenticated
        };
    }

    async componentDidUpdate(prevProps) {
        // Verificar si el estado de autenticación ha cambiado
        if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
            // Actualizar el estado de autenticación
            this.setState({ isAuthenticated: this.props.auth.isAuthenticated });
        }
    }

    handleLogOut = async event => {
        event.preventDefault();
        try {
            await Auth.signOut();
            this.props.auth.setAuthStatus(false);
            this.props.auth.setUser(null);
        } catch (error) {
            console.log(error.message);
        }
    };

    render() {
        return (
            <Navbar className='Ali-navbar' bg="primary" variant="dark" expand="lg">
                <Container>
                    {!this.state.isAuthenticated && (
                        <Navbar.Brand href="/"><img src={logo_site} alt="Logo" /></Navbar.Brand>
                    )}
                    {this.state.isAuthenticated && (
                        <Navbar.Brand href="/Signup"><img src={logo_site} alt="Logo" /></Navbar.Brand>
                    )}
                    <Navbar.Toggle />
                    <Navbar.Collapse id="basic-navbar-nav navbarScroll" >
                        {!this.state.isAuthenticated && (
                            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                                <Nav.Link href="/">Welcome</Nav.Link>
                                <Nav.Link href="/About">About</Nav.Link>
                            </Nav>
                        )}
                        {this.state.isAuthenticated && (
                            <Nav className="me-auto">
                                <Navbar.Brand href="/Signup">
                                    {this.state.isAuthenticated && this.props.auth.user && (
                                        <h6 className='user_welcoming'>welcome {this.props.auth.user.username}</h6>
                                    )}
                                </Navbar.Brand>
                                <Nav.Link href="/Analytics">Analytics</Nav.Link>
                                <Nav.Link href="/Inbox">Inbox</Nav.Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {!this.state.isAuthenticated && (
                                <Nav.Link href="/Signup">Signup</Nav.Link>
                            )}
                            {this.state.isAuthenticated && (
                                <Col xs={6} md={4}>
                                    <NavDropdown title="" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/Settings">Settings</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item >
                                            <Button onClick={this.handleLogOut}>
                                                Sign Out
                                            </Button>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Col>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Navebar;
