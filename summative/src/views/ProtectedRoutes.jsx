import { Outlet, Navigate } from "react-router-dom";
import { useStoreContext } from "../context";

function ProtectedRoutes() {
    const { currentUser, loading } = useStoreContext();

    if (loading) {
        return null;
    }

    return (
        currentUser ? <Outlet /> : <Navigate to="/login" />
    );
}

export default ProtectedRoutes;