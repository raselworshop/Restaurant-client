import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import Menu from '../Pages/Menu/Menu/Menu';

const route = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
            index: true,
            element: <Home/>
        },
        {
            path: 'menu',
            element: <Menu></Menu>
        }
      ]
    },
  ]);

export default route;