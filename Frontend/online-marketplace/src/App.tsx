import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./core/features/Navbar";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import Login from "./features/authentication/Login";

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
    const hideNavbar = location.pathname === '/login';

    return (
        <>
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                {/* Dodaj druge rute ovde */}
            </Routes>
        </>
    );
};
export default App;
