import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, token, loading } = useAuth();
    const location = useLocation();

    // JWT malformed
    if (!loading && token && user === null) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    // JWT expired and invalid signature
    if (!loading && user === null) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    // Token not found
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
