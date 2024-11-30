import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';


export default function PrivateRoute(props) {
  const auth = sessionStorage.getItem("data_token");

  console.log(auth);
  

  if (auth) {
    return <Outlet />
  } else {
    return <Navigate to={'/login'} />
  }
}