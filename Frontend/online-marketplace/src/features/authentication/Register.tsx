import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Register.css';
import axiosInstance from "../../axiosConfig";
import {useNavigate} from "react-router-dom";

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const registrationDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

        const payload = {
            username,
            password,
            registrationDate,
            phoneNumber,
        };

        try {
            const response = await axiosInstance.post('/api/users', payload);
            if (response.status === 201) {
                navigate('/login');

            }
        } catch (error) {
            console.error('There was an error with the registration!', error);
            alert('Registration failed. Username may already exist.');
        }
    };

    return (
        <Container className="register-container">
            <Form className="register-form" onSubmit={handleSubmit}>
                <h2 className="text-center">Sign up</h2>
                <Row className="mb-2">
                    <Col>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
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
