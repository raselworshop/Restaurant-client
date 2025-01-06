import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import Menu from '../Pages/Menu/Menu/Menu';
import Order from '../Pages/Order/Order/Order';
import Signin from '../Pages/AuthRelated/Signin';
import Signup from '../Pages/AuthRelated/Signup';
import PrivateRoute from './PrivateRoute';
import Secret from '../Component/common/Secret/Secret';
import Dashboard from '../Layout/Dashboard';
import Cart from '../Pages/Dashboard/Cart/Cart';
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers';
import AddItem from '../Pages/Dashboard/AddItem/AddItem';
import AdminRoute from './AdminRoute';

const route = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'menu',
        element: <Menu></Menu>
      },
      {
        path: 'order/:category',
        element: <Order></Order>
      },
      {
        path: 'secret',
        element: <PrivateRoute>
          <Secret />
        </PrivateRoute>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute>
      <Dashboard></Dashboard>
    </PrivateRoute>,
    children: [
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      // admin route 
      {
        path: 'addItems',
        element: <AdminRoute>
          <AddItem></AddItem>
        </AdminRoute>
      },
      {
        path: 'manageUsers',
        element: <AdminRoute>
          <AllUsers></AllUsers>
        </AdminRoute>
      }
    ]
  },
  {
    path: '/signin',
    element: <Signin></Signin>
  },
  {
    path: '/signup',
    element: <Signup></Signup>
  }
]);

export default route;