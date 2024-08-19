import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./core/features/Navbar";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";

// function App() {
//   return (
//       <>
//           <Router>
//               <Navbar></Navbar>
//           </Router>
//       </>
//   );
// }

const App: React.FC = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Dodaj druge rute ovde */}
            </Routes>
        </>
    );
};
export default App;
