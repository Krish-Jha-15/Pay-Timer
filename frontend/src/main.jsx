import { StrictMode } from 'react';
import './index.css'; 
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './pages/Login.pages';
import Auth from './authantication/Auth';
import Dashboard from "./pages/dashboard.page"
import EditPayment from './pages/Edit';
import Create from "./pages/Create"
import Signup from './pages/Signup';
import Home from './pages/Home';

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/login",
        element:<Login />
      },
      {
        path:"/dashboard",
        element:
          <Dashboard/>
        
      },
      {
        path:'/edit/:id',
        element: <EditPayment/>
      },
      {
        path:'/create',
        element: <Create/>
      },
      {
        path:'/signup',
        element : <Signup/>
      },
      {
        path:"/",
        element:<Home/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
      <RouterProvider router={router} />
  </StrictMode>
);