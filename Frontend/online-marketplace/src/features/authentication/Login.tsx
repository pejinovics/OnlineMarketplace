import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './Login.css';

const Login: React.FC = () => {
    return (
        <Container className="login-container">
            <Form className="login-form">
                <h2>Login</h2>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
