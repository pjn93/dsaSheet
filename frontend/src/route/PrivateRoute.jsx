import React from 'react'
import { Outlet, Navigate  } from 'react-router-dom'

const PrivateRoute = () => {
  const user = localStorage.getItem('user');  // We now check for the entire 'user' object

  if (!user) {
    return <Navigate to="/login" replace />;
  }
return <Outlet/>
}


export default PrivateRoute
