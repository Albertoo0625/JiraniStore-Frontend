import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App1 from './App1';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
        <Routes>
          <Route path="/*" element={<App1 />} />
        </Routes>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);