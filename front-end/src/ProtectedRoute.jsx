import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import React from 'react'

const ProtectedRoute = () => {
    const {auth} = useAuth()
    const location = useLocation()
    console.log("authInProtected",auth)
  return (
        auth?.email
            ?<Outlet/>
            :<Navigate to="/login" state={{from:location}} replace/>
  )
}

export default ProtectedRoute
