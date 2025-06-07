import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../AuthContext/AuthContext';
import Skeleton from '../Component/Skeleton/Skeleton';


const PrivateRoute = ({children}) => {

    const {user,isLoading}=useContext(AuthContext);

    const location=useLocation();


    if(isLoading){
        return <Skeleton/>
    }

    if(user && user?.email){
        return children;
    }else{
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

    
};

export default PrivateRoute;