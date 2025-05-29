import { Outlet, Navigate } from "react-router-dom";
import { useStoreContext } from "../context";

function ProtectedRoutes() {
    const { currentUser } = useStoreContext();

    return (
        currentUser ? <Outlet /> : <Navigate to="/login" />
    );
}

export default ProtectedRoutes;