import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddSkill from './pages/AddSkill';
import BrowseSkills from './pages/BrowseSkills';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-skill" element={<AddSkill />} />
        <Route path="/browse" element={<BrowseSkills />} />
      </Routes>
    </Router>
  );
}

export default App;