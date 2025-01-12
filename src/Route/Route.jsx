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
import ManageItem from '../Pages/Dashboard/MangeItem/ManageItem';
import UpdateItem from '../Pages/Dashboard/UpdateItem/UpdateItem';
import Payment from '../Pages/Dashboard/Payment/Payment';
import PaymentHistory from '../Pages/Dashboard/PaymentHistory/PaymentHistory';
import UserHome from '../Pages/Dashboard/UserHome/UserHome';
import AdminHome from '../Pages/Dashboard/AdminHome/AdminHome';

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
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>
      },
      // admin route 
      {
        path: 'adminHome',
        element: <AdminRoute>
          <AdminHome/>
        </AdminRoute>
      },
      {
        path: 'addItems',
        element: <AdminRoute>
          <AddItem></AddItem>
        </AdminRoute>
      },
      {
        path: 'manageItems',
        element: <AdminRoute> <ManageItem /></AdminRoute>
      },
      {
        path: 'updateItem/:id',
        element: <AdminRoute><UpdateItem /></AdminRoute>,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`https://bistro-restaurant-server-dusky.vercel.app/menu/${params.id}`);
            if (!response.ok) {
              // throw new Error('Network response was not ok');
            }
            // const data = await response.json();
            return response //data;
          } catch (error) {
            // console.error('Error fetching data:', error);
            throw error;
          }
        }
      }
      ,
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