import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import ProductRegister from './pages/ProductRegister';
import Chat from './pages/Chat'
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
    children: [
      { index : true ,path: '/', element: <Home /> },
      { path: '/products/new/:id', element: <ProductRegister /> },
      { path: '/chat', element: <Chat />},
      { path : '/sign', element : <SignUp /> },
      { path : '/profile', element : <Profile /> }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router = {router}/>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
