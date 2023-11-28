import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './component/footer/Footer';
import Header from './component/header/Header';

export default function App() {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}

