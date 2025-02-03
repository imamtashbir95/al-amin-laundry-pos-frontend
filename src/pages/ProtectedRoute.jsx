import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        console.log(token);
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    console.log("Token: ", token);
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
