import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './core/features/UserContext';

const ProtectedRoute: React.FC = () => {
    const { isLoggedIn } = useUser();

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
