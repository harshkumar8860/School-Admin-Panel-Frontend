import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSchool } from '../context/SchoolContext'

const RoleProtectedRoute = ({ allowedRoles }) => {
    const { currentUser, mustMarkTeacherAttendance } = useSchool();
    const location = useLocation();

    // not logged in (extra safety)
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/" replace />;
    }

    // teacher must mark attendance first
    if (currentUser.role === 'TEACHER' &&
        mustMarkTeacherAttendance && location.pathname !== "/attendance"
    ) {
        return <Navigate to="/attendance" replace />;
    }

    return <Outlet />;

};

export default RoleProtectedRoute;