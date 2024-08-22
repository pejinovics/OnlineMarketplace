import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import MyNavbar from "./core/features/Navbar";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import Home from "./features/advertisements/home/Home";
import { useUser } from "./core/features/UserContext";
import AddAdvertisement from "./features/advertisements/addAdvertisement/AddAdvertisement";
import EditAdvertisement from "./features/advertisements/editAdvertisement/EditAdvertisement";
import AdvertisementDetails from "./features/advertisements/advertisementDetails/AdvertisementDetails";
import ProtectedRoute from './ProtectedRoute';

const App: React.FC = () => {
    const location = useLocation();
    const { isLoggedIn } = useUser();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {!hideNavbar && <MyNavbar />}
            <div style={{ paddingTop: '70px' }}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/add-advertisement" element={<AddAdvertisement />} />
                        <Route path="/edit-advertisement/:id" element={<EditAdvertisement />} />
                    </Route>

                    <Route path="/advertisement-details/:id" element={<AdvertisementDetails />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
