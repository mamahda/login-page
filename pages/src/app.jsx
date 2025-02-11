import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login.jsx';
import Home from './components/home.jsx';

function App() {
  return (
    <Router>
      <Routes>   
        <Route exact path="/" element={<Login />} /> 
        <Route path="/home" element={<Home />} />   
      </Routes>
    </Router>
  );
}

export default App;

