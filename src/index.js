// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Ubah ini menjadi 'react-dom/client'
import "./index.css"; // Optional untuk gaya global
import App from "./App"; // Mengimpor komponen utama

// Menggunakan React 18+ untuk merender aplikasi
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
