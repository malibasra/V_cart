import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Comm/Login';
import Register from './Comm/Register';
import Main from './Comm/Main';
import About from './Comm/About';
import Admin from './Comm/Admin';
import Product from './Comm/Product';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import UpdateProduct from './Comm/UpdateProduct';
import Fruit from './category/Fruit';
import Logout from './Comm/Logout';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "Login",
    element: <Login/>,
  },
  {
    path: "Register",
    element: <Register/>,
  },
  {
    path: "Main",
    element: <Main/>,
  },
  {
    path: "About",
    element: <About/>,
  },
  {
    path:"Admin",
    element:<Admin/>
  },
  {
    path:"Product",
    element:<Product/>
  },
  {
    path:"UpdateProduct",
    element:<UpdateProduct/>
  },
  {
    path:"Fruit",
    element:<Fruit/>
  },
  {
    path:"Logout",
    element:<Logout/>
  },
]);
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
