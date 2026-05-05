import React from 'react';
import { createRoot } from 'react-dom/client';
// import FormPendaftaran from './FormPendaftaran';
import './tailwind.css';   // <-- Harus ada
import FashionStore from './FashionStore';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <FormPendaftaran /> */}
    <FashionStore/>
  </React.StrictMode>
);