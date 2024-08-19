import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./core/features/Navbar";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
      <>
          <Router>
              <Navbar></Navbar>
          </Router>
      </>
  );
}

export default App;
