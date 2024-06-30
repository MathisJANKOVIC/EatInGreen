import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/auth';

import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import Profil from './screens/Profil';
import Product from './screens/Product';
import Cart from './screens/Cart';

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
          <Route path="/cart" element={<Cart />} />

          <Route path="/product/:id" element={<Product />} />
          <Route path="/search/:searchText" element={<Home />} />


          {/* Ajoutez d'autres itinéraires si nécessaire */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
