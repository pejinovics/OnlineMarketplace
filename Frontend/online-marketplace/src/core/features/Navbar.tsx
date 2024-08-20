import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axiosInstance from "../../axiosConfig";

const MyNavbar: React.FC = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axiosInstance.get('/api/auth/logout', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Očistite podatke o prijavi
            localStorage.removeItem('token');
            localStorage.removeItem('username');

            // Preusmerite na stranicu za prijavu
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
            // Opcionalno obradite greške tokom odjave
        }
    };


    return (
        <Navbar variant="dark" expand="lg" fixed="top">
            <Navbar.Brand as={Link} to="/">OnlineMarketplace</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {!username ? (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                            <span className="navbar-text ml-3">Welcome, {username}</span>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MyNavbar;
