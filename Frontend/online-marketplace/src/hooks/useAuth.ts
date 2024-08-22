// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            setUsername(localStorage.getItem('username'));
        } else {
            setIsAuthenticated(false);
            setUsername(null);
        }
    }, []);

    return { isAuthenticated, username };
};
