import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Badge, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axiosInstance from "../../../axiosConfig";
import "./AddAdvertisement.css";

type CategoryOption = 'CLOTHING' | 'TOOLS' | 'SPORTS' | 'ACCESSORIES' | 'FURNITURE' | 'PETS' | 'GAMES' | 'BOOKS' | 'TECHNOLOGY';

const categoriesOptions: CategoryOption[] = [
    'CLOTHING', 'TOOLS', 'SPORTS', 'ACCESSORIES', 'FURNITURE', 'PETS', 'GAMES', 'BOOKS', 'TECHNOLOGY'
];

const AddAdvertisement: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [city, setCity] = useState('');
    const [postedDate, setPostedDate] = useState<string>('');
    const [availableCategories, setAvailableCategories] = useState<CategoryOption[]>(categoriesOptions);
    const [error, setError] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const navigate = useNavigate();
    const userId = Number(localStorage.getItem('userId'));

    useEffect(() => {
        setPostedDate(new Date().toISOString().split('T')[0]);
    }, []);

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: (acceptedFiles) => {
            setImage(acceptedFiles[0]);
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!title || !description || price <= 0 || !city || categories.length === 0) {
            setError('All fields must be filled and at least one category must be selected.');
            return;
        }

        if (!image) {
            setError('Image must be uploaded.');
            return;
        }

        setError(null);

        // Create advertisement data
        const advertisementData = {
            title,
            description,
            price,
            categories,
            userId,
            city,
            postedDate
        };

        try {
            // Step 1: Create the advertisement
            const response = await axiosInstance.post('/api/advertisements', advertisementData);
            const advertisementId = response.data.id; // Assuming the response contains the advertisement ID

            console.log('Advertisement created:', response.data);

            // Step 2: Upload the image if selected
            if (image) {
                const formData = new FormData();
                formData.append('image', image);

                await axiosInstance.post(`/api/images/${advertisementId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Image uploaded successfully');
            }

            navigate('/');
        } catch (error) {
            console.error('Error creating advertisement or uploading image:', error);
        }
    };

    const handleCategoryClick = (category: CategoryOption) => {
        setCategories((prevCategories) => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter(c => c !== category);
            } else {
                return [...prevCategories, category];
            }
        });
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2>Add Advertisement</h2>
                    <Form onSubmit={handleSubmit} className="formClass">
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCategories">
                            <Form.Label>Categories</Form.Label>
                            <Stack direction="horizontal" gap={2} className="flex-wrap">
                                {availableCategories.map(category => (
                                    <Badge
                                        key={category}
                                        bg={categories.includes(category) ? 'primary' : 'secondary'}
                                        text="light"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        {category}
                                    </Badge>
                                ))}
                            </Stack>
                        </Form.Group>

                        <Form.Group controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <div
                                {...getRootProps({ className: 'dropzone' })}
                                style={{
                                    border: '2px dashed #ddd',
                                    borderRadius: '4px',
                                    padding: '20px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: "#e3f2fd"
                                }}
                            >
                                <input {...getInputProps()} />
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        style={{
                                            width: '150px',
                                            height: 'auto',
                                            marginTop: '10px'
                                        }}
                                    />
                                ) : (
                                    <p>Drag & drop an image here, or click to select one</p>
                                )}
                            </div>
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                        {error && (
                            <div className="text-danger mt-3">
                                {error}
                            </div>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddAdvertisement;
