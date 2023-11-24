import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductRegister from './pages/ProductRegister';
import Chat from './pages/Chat'
import Home from './pages/Home';
import DetailItem from './pages/DetailItem';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    // errorElement: <NotFound />,
    children: [
      { index : true ,path: '/', element: <Home /> },
      { path: '/products/new/:id', element: <ProductRegister /> },
      { path: '/productDetail/:pid', element: <DetailItem /> },
      { path: '/chat', element: <Chat/>}

    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
