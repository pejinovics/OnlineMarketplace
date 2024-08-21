import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axiosInstance from "../../axiosConfig";
import { useUser } from './UserContext';

const MyNavbar: React.FC = () => {
    // const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const { isLoggedIn, username, setIsLoggedIn, setUsername, setUserId } = useUser();

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
            localStorage.removeItem('userId');

            setIsLoggedIn(false);
            setUsername('');
            setUserId(null);
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
                    {isLoggedIn ? (
                        <>
                            <span className="navbar-text ml-3">{username}</span>
                            <Nav.Link as={Link} to="/add-advertisement" >Add advertisement</Nav.Link>
                            <Nav.Link as={Link} to="/home" onClick={handleLogout}>Sign Out</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MyNavbar;
