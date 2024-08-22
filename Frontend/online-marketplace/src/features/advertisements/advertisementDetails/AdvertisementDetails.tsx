import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axiosInstance from "../../../axiosConfig";
import './AdvertisementDetails.css';

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

type CategoryOption = 'CLOTHING' | 'TOOLS' | 'SPORTS' | 'ACCESSORIES' | 'FURNITURE' | 'PETS' | 'GAMES' | 'BOOKS' | 'TECHNOLOGY';

const AdvertisementDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [advertisement, setAdvertisement] = useState<Advertisement | null>(null);
    const [error, setError] = useState<string | null>(null);
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axiosInstance.get(`/api/advertisements/${id}`)
                .then(response => {
                    setAdvertisement(response.data);
                })
                .catch(error => {
                    console.error('Error fetching advertisement details:', error);
                    setError('Failed to load advertisement details.');
                });
        }
    }, [id]);

    const handleEditClick = () => {
        if (advertisement) {
            navigate(`/edit-advertisement/${advertisement.id}`);
        }
    };

    const handleDeleteClick = async () => {
        if (advertisement) {
            try {
                await axiosInstance.delete(`/api/advertisements/${advertisement.id}`);
                navigate('/');
            } catch (error) {
                console.error('Error deleting advertisement:', error);
            }
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!advertisement) {
        return <div>Loading...</div>;
    }

    return (
        <div className="advertisement-details">
            <h1>{advertisement.title}</h1>
            <div className="advertisement-content">
                <img
                    src={`data:image/jpeg;base64,${advertisement.image}`}
                    alt={advertisement.title}
                    className="advertisement-image"
                />
                <div className="advertisement-info">
                    <p><strong>Price:</strong> ${advertisement.price}</p>
                    <p><strong>City:</strong> {advertisement.city}</p>
                    <p><strong>Posted Date:</strong> {new Date(advertisement.postedDate).toLocaleDateString()}</p>
                    <p><strong>Posted By:</strong> {advertisement.user.username}</p>
                </div>
            </div>
            <div className="advertisement-description">
                <p><strong>Description:</strong></p>
                <div className="description-content">
                    {advertisement.description}
                </div>
            </div>
            <div className="advertisement-categories">
                <p><strong>Categories:</strong></p>
                <div className="category-chips">
                    {advertisement.categories.map((category, index) => (
                        <span key={index} className="category-chip">
                            {category}
                        </span>
                    ))}
                </div>
            </div>
            {advertisement.user.id === userId && (
                <div className="advertisement-actions">
                    <button onClick={handleEditClick} className="action-button">Edit</button>
                    <button onClick={handleDeleteClick} className="action-button-delete">Delete</button>
                </div>
            )}
        </div>
    );
};

export default AdvertisementDetails;
