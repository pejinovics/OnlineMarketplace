import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
    isLoggedIn: boolean;
    username: string;
    userId: string | null;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUsername: (username: string) => void;
    setUserId: (userId: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedUserId = localStorage.getItem('userId');

        if (token) {
            setIsLoggedIn(true);
            if (storedUsername) {
                setUsername(storedUsername);
            }
            if (storedUserId) {
                setUserId(storedUserId);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'token' || event.key === 'username' || event.key === 'userId') {
                const token = localStorage.getItem('token');
                const storedUsername = localStorage.getItem('username');
                const storedUserId = localStorage.getItem('userId');

                if (token) {
                    setIsLoggedIn(true);
                    if (storedUsername) {
                        setUsername(storedUsername);
                    }
                    if (storedUserId) {
                        setUserId(storedUserId);
                    }
                } else {
                    setIsLoggedIn(false);
                    setUsername('');
                    setUserId(null);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <UserContext.Provider value={{ isLoggedIn, username, userId, setIsLoggedIn, setUsername, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
