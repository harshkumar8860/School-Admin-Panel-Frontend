import { Navigate, Outlet } from "react-router-dom";
import { useSchool } from "../context/SchoolContext";

const ProtectedRoute = () => {
    const { currentUser } = useSchool();
    if (!currentUser) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />;
}

export default ProtectedRoute;