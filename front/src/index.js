import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@asgardeo/auth-react";
import config from "./config.json";
import Admin from './pages/Admin';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Payment from './pages/Payment';

createRoot(document.getElementById('root')).render(
    <AuthProvider config={config}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/payment/:userId" element={<Payment />} />
        </Routes>
      </Router>
    </AuthProvider>
);