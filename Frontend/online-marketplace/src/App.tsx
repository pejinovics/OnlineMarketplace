import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import MyNavbar from "./core/features/Navbar";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import Home from "./features/advertisements/home/Home";
import { useUser } from "./core/features/UserContext";
import AddAdvertisement from "./features/advertisements/addAdvertisement/AddAdvertisement";

const App: React.FC = () => {
    const location = useLocation();
    const { isLoggedIn } = useUser();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {!hideNavbar && <MyNavbar />}
            <div style={{ paddingTop: '70px' }}> {/* Dodaj padding-top ovde */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} /> {/* Koristi Home komponentu */}
                    <Route path="/add-advertisement" element={<AddAdvertisement />} />
                    {/* Add other routes here */}
                </Routes>
            </div>
        </>
    );
};

export default App;
