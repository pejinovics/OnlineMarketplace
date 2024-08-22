import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axiosInstance from "../../axiosConfig";
import {useUser} from "../../core/features/UserContext";

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn, setUsername: setUserContextUsername, setUserId } = useUser();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/auth/login', { username, password });

            // Sačuvajte JWT token
            localStorage.setItem('token', response.data.jwt);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', response.data.id);

            setIsLoggedIn(true);
            setUserContextUsername(username);
            setUserId(response.data.userId);

            // Preusmerite na početnu stranicu
            navigate('/');
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                setError('Incorrect credentials. Please try again.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <Container className="login-container">
            <Form className="login-form" onSubmit={handleLogin}>
                <h2 className="text-center">Login</h2>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {error && <div className="text-danger">{error}</div>}
                <Button variant="primary" type="submit" className="w-100">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
