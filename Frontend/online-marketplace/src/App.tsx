import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import MyNavbar from "./core/features/Navbar";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";

const App: React.FC = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {!hideNavbar && <MyNavbar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<div>Home Page</div>} />
                {/* Add other routes here */}
            </Routes>
        </>
    );
};

export default App;
