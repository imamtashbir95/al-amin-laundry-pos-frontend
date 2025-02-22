import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export const ProtectedRoute = ({ children, requiredRole }) => {
    const { token, user } = useAuth();
    const location = useLocation();

    if (token && user === null) {
        return null; // Bisa diganti dengan loading spinner
    }

    if (!token) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    requiredRole: PropTypes.string,
};
