import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Login.css';

const Login: React.FC = () => {
    return (
        <Container className="login-container">
            <Form className="login-form">
                <h2 className="text-center">Login</h2>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="w-100">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
