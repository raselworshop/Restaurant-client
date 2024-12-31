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
    path: '/signin',
    element: <Signin></Signin>
  },
  {
    path: '/signup',
    element: <Signup></Signup>
  }
]);

export default route;