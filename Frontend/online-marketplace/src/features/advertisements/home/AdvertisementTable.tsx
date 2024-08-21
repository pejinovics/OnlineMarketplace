import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Pagination } from 'react-bootstrap';
import axios from 'axios';
import './AdvertisementTable.css';
import {Console} from "inspector";
import axiosInstance from "../../../axiosConfig";

interface Advertisement {
    id: number;
    image: string | null;
    title: string;
    price: number;
    city: string;
    categories: string[];
    userId: number
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
        minPrice: '',
        maxPrice: '',
        showMineOnly: false,
    });
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const fetchAdvertisements = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const params: any = {
                titleContains: filters.titleContains || "",
                maxValue: filters.maxPrice || null,
                userId: filters.showMineOnly ? (userId ? userId : 0) : 0,
                category: filters.category || null,
            };

            const response = await axiosInstance.get('/api/advertisements/cards/filter', { params });

            if (Array.isArray(response.data)) {
                setAdvertisements(response.data);
            } else {
                console.error('Invalid response format:', response.data);
                setAdvertisements([]);
            }
            // setTotalPages(response.data.totalPages || 1);
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
                [name]: value === 'AllCategories' ? null : value, // Postavi na null ako je "AllCategories"
            });
        }
    };



    return (
        <div className="table-container">
            <Form className="filter-container">
                <Form.Group controlId="formCategory" className="filter-form-group">
                    <Form.Label className="filter-label">Category</Form.Label>
                    <select name="category" value={filters.category ?? 'AllCategories' } onChange={handleFilterChange} className="form-control">
                        {categories.map(category => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </Form.Group>

                <Form.Group controlId="formTitleContains" className="filter-form-group">
                    <Form.Label className="filter-label">Title Contains</Form.Label>
                    <input
                        type="text"
                        placeholder="Search by title"
                        name="titleContains"
                        value={filters.titleContains}
                        onChange={handleFilterChange}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="formMaxPrice" className="filter-form-group">
                    <Form.Label className="filter-label">Max Price</Form.Label>
                    <input
                        type="number"
                        placeholder="Max Price"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="form-control"
                    />
                </Form.Group>

                <div className="show-mine-container">
                    <Form.Group controlId="formShowMineOnly">
                        <Form.Check
                            type="checkbox"
                            label="Show mine only"
                            name="showMineOnly"
                            checked={filters.showMineOnly}
                            onChange={handleFilterChange}
                        />
                    </Form.Group>
                </div>
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
                        {ad.image ? (
                            <img src={`data:image/jpeg;base64,${ad.image}`} alt={ad.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        ) : (
                            'No image available'
                        )}
                        <td>{ad.title}</td>
                        <td>{ad.price}</td>
                        <td>{ad.city}</td>
                        <td>{ad.categories.join(', ')}</td>
                        <td>
                            <Button className="buttonEdit" style={{ display: ad.userId === userId ? 'inline-block' : 'none' }}>Edit</Button>
                            <Button variant="danger" style={{ display: ad.userId === userId ? 'inline-block' : 'none' }}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Pagination className="pagination">
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
            </Pagination>
        </div>
    );
};

export default AdvertisementTable;
