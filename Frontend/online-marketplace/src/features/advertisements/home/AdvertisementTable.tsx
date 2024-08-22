import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../../axiosConfig";
import './AdvertisementTable.css';

interface Advertisement {
    id: number;
    image: string | null;
    title: string;
    price: number;
    city: string;
    categories: string[];
    userId: number;
}

const categories = [
    { value: 'AllCategories', label: 'All Categories' },
    { value: 'CLOTHING', label: 'Clothing' },
    { value: 'TOOLS', label: 'Tools' },
    { value: 'SPORTS', label: 'Sports' },
    { value: 'ACCESSORIES', label: 'Accessories' },
    { value: 'FURNITURE', label: 'Furniture' },
    { value: 'PETS', label: 'Pets' },
    { value: 'GAMES', label: 'Games' },
    { value: 'BOOKS', label: 'Books' },
    { value: 'TECHNOLOGY', label: 'Technology' },
];

const AdvertisementTable: React.FC = () => {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        category: '',
        titleContains: '',
        maxPrice: '',
        showMineOnly: false,
    });
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const navigate = useNavigate();

    const fetchAdvertisements = async () => {
        try {
            const params: any = {
                titleContains: filters.titleContains || "",
                maxValue: filters.maxPrice || null,
                userId: filters.showMineOnly ? userId : 0,
                category: filters.category || null,
            };

            const response = await axiosInstance.get('/api/advertisements/cards/filter', { params });

            if (Array.isArray(response.data)) {
                setAdvertisements(response.data);
            } else {
                console.error('Invalid response format:', response.data);
                setAdvertisements([]);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized request. Please check your credentials or token.');
            } else {
                console.error('There was an error fetching the advertisements!', error);
            }
        }
    };

    useEffect(() => {
        fetchAdvertisements();
    }, [filters, currentPage]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        if (type === 'checkbox') {
            const { checked } = event.target as HTMLInputElement;
            setFilters({
                ...filters,
                [name]: checked,
            });
        } else {
            setFilters({
                ...filters,
                [name]: value === 'AllCategories' ? null : value,
            });
        }
    };

    const handleImageClick = (id: number) => {
        navigate(`/advertisement-details/${id}`);
    };

    const handleEditClick = (id: number) => {
        navigate(`/edit-advertisement/${id}`);
    };

    const handleDeleteClick = async (id: number) => {
        try {
            await axiosInstance.delete(`/api/advertisements/${id}`);
            setAdvertisements(advertisements.filter(ad => ad.id !== id));
        } catch (error) {
            console.error('Failed to delete the advertisement:', error);
        }
    };

    return (
        <div className="table-container">
            <Form className="filter-container">
                {/* ... Filter form fields ... */}
            </Form>

            <Table responsive bordered hover>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>City</th>
                    <th>Categories</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {advertisements.map(ad => (
                    <tr key={ad.id}>
                        <td>
                            {ad.image ? (
                                <img
                                    src={`data:image/jpeg;base64,${ad.image}`}
                                    alt={ad.title}
                                    style={{ maxWidth: '100px', maxHeight: '100px', cursor: 'pointer' }}
                                    onClick={() => handleImageClick(ad.id)}
                                />
                            ) : (
                                <span>No image available</span>
                            )}
                        </td>
                        <td>{ad.title}</td>
                        <td>{ad.price}</td>
                        <td>{ad.city}</td>
                        <td>{ad.categories.join(', ')}</td>
                        <td>
                            <Button
                                className="buttonEdit"
                                style={{ display: ad.userId === userId ? 'inline-block' : 'none' }}
                                onClick={() => handleEditClick(ad.id)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                style={{ display: ad.userId === userId ? 'inline-block' : 'none', marginLeft: '10px' }}
                                onClick={() => handleDeleteClick(ad.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdvertisementTable;
