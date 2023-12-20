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
import DetailItem from './pages/DetailItem';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProductEdit from './pages/ProductEdit';
import SearchProduct from './pages/SearchProduct';
import Purchase from './pages/Purchase';
import ProductManage from './pages/ProductManage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index : true ,path: '/', element: <Home /> },
      { path: '/loadMore/:offset/:newLimit', element: <Home /> },
      { path: '/products/new/:id', element: <ProductRegister /> },
      { path: '/edit/:pid', element: <ProductEdit /> },
      { path: '/productDetail/:pid', element: <DetailItem /> },
      { path: '/chat', element: <Chat/>},
      { path : '/sign', element : <SignUp /> },
      { path : '/search', element : <SearchProduct /> },
      { path : '/purchase/:pid/:uid/:tid', element : <Purchase/>},
      { path : '/profile/:uid', element : <Profile /> },
      { path : '/productmanage/:uid', element : <ProductManage /> }
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
