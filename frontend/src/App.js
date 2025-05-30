import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Product from './pages/product/product';
import ProductList from './pages/product/productList';
import EditProduct from './pages/product/editProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/Product" element={<Product />}/>
        <Route path="/product-list" element={<ProductList />}/>
        <Route path="/edit-prdouct" element={<EditProduct />}/>
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        {/* ... other routes */}
      </Routes>
    </Router>
  );
}
export default App;