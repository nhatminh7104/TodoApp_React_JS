import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (!user)
        return <Navigate to="/login" replace />;

    return props.children;
}

export {
    PrivateRoute
}