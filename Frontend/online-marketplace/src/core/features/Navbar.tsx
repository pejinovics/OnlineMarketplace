import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

const MyNavbar: React.FC = () => {
    return (
        <Navbar variant="dark" expand="lg" fixed="top">
            <Navbar.Brand as={Link} to="/">OnlineMarketplace</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
                    {/* Uncomment and modify the following buttons later */}
                    {/* <Nav.Link as={Link} to="/new-ad">Add Advertisement</Nav.Link>
                    <Button variant="outline-light" onClick={() => {/* sign out logic */ /*}}>Sign Out</Button> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MyNavbar;
