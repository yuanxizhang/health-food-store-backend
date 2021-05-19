// config/routes.js

import React from "react";
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard'

const routes =[
    {
        path:'/login',
        component: Login
    },
    {
        path:'/dashboard',
        component: Dashboard
    },
    {
        path:'/products',
        component: ProductList
    },
    {
        path:'/add-product',
        component: AddProduct
    },
  ]
  
  export default routes