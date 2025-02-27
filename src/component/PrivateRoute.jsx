import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';


const PrivateRoute = ({children}) => {

    
    let {user,loading}= useContext(AuthContext)

    let location= useLocation()

    if(loading){
        return <progress className="progress w-56"></progress>
    }


    if(user){
        return children
    }


    return <Navigate  to={"/login"} state={{from:location}} replace></Navigate>
    
};

export default PrivateRoute;