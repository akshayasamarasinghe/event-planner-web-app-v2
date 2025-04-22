import { Navigate } from "react-router-dom";
import {JSX} from "react";
import {useAuth} from "../pages/Auth/AuthContext.tsx";

const AdminProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const auth: any = useAuth();
    console.log(auth, "auth");

    if (!auth.user || auth?.userType !== "ADMIN") {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AdminProtectedRoute;
