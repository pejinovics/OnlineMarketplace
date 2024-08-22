import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Badge, Stack } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from "../../../axiosConfig";
import "./EditAdvertisement.css";

type CategoryOption = 'CLOTHING' | 'TOOLS' | 'SPORTS' | 'ACCESSORIES' | 'FURNITURE' | 'PETS' | 'GAMES' | 'BOOKS' | 'TECHNOLOGY';

interface Advertisement {
    id: number;
    title: string;
    description: string;
    image: string | null;
    price: number;
    categories: CategoryOption[];
    user: User;
    city: string;
    postedDate: string;
}

interface User {
    id: number;
    username: string;
    password: string;
    phoneNumber: string;
    registrationDate: string;
    jwt: string;
}

const categoriesOptions: CategoryOption[] = [
    'CLOTHING', 'TOOLS', 'SPORTS', 'ACCESSORIES', 'FURNITURE', 'PETS', 'GAMES', 'BOOKS', 'TECHNOLOGY'
];

const EditAdvertisement: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [city, setCity] = useState('');
    const [postedDate, setPostedDate] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axiosInstance.get(`/api/advertisements/${id}`)
                .then(response => {
                    const data: Advertisement = response.data;
                    setTitle(data.title);
                    setDescription(data.description);
                    setPrice(data.price);
                    setCategories(data.categories);
                    setCity(data.city);
                    setPostedDate(data.postedDate);
                    setUser(data.user);
                    if (data.image) {
                        setPreview(`data:image/jpeg;base64,${data.image}`);
                        console.log('Fetched Image Base64 (first 20 chars):', data.image.substring(0, 20));
                    }
                })
                .catch(error => {
                    console.error('Error fetching advertisement details:', error);
                });
        }
    }, [id]);

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || price <= 0 || !city || categories.length === 0) {
            setError('All fields must be filled and at least one category must be selected.');
            return;
        }
        setError(null);

        // Convert image to base64 if it exists
        const imageBase64 = image ? await convertToBase64(image) : null;

        // Log the first 20 characters of the image data
        if (imageBase64) {
            console.log('Image Base64 (first 20 chars):', imageBase64.substring(0, 20));
        }

        // Create advertisement data
        const advertisementData = {
            id,
            title,
            description,
            image: imageBase64,
            price,
            categories,
            user,
            city,
            postedDate
        };

        try {
            // Update the advertisement
            await axiosInstance.put(`/api/advertisements/${id}`, advertisementData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (image) {
                const formData = new FormData();
                formData.append('image', image);

                await axiosInstance.post(`/api/images/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Image uploaded successfully');
            }
            // Redirect to /home on success
            navigate('/');
        } catch (error) {
            console.error('Error updating advertisement:', error);
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    // Convert File to Base64 string
    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                const base64String = base64.split(',')[1]; // Remove data URL part
                resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2>Edit Advertisement</h2>
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
                                {categoriesOptions.map(category => (
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
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        width: '150px',
                                        height: 'auto',
                                        marginTop: '10px'
                                    }}
                                />
                            )}
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

export default EditAdvertisement;