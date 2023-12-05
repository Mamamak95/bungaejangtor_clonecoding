import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import ScrollToTop from './component/ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}

