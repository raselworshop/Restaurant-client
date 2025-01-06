import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const { user, loading }= useAuth();
    const [isAdmin, adminLoading] = useAdmin();
    const location = useLocation();

    if(loading || adminLoading){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to={'/signin'} state={{from: location}} replace></Navigate>
};

export default AdminRoute;