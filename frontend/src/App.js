import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/auth';

import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import Profil from './screens/Profil';
import Product from './screens/Product';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/product/:id" element={<Product />} />

          {/* Ajoutez d'autres itinéraires si nécessaire */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
