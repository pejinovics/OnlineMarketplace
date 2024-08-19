import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Register.css';

const Register: React.FC = () => {
    return (
        <Container className="register-container">
            <Form className="register-form">
                <h2 className="text-center">Sign up</h2>
                <Row className="mb-2">
                    <Col>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="number" placeholder="Enter phone number" />
                            <Form.Text className="text-muted">
                                Only numbers are allowed.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="w-100">
                    Sign up
                </Button>
            </Form>
        </Container>
    );
};

export default Register;
