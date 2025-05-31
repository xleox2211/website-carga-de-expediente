import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../userContext"; // Adjust the import path as necessary

function AuthChecker() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        // Check if the user is authenticated
        if (!isAuthenticated && location.pathname !== "/") {
        console.log(location.pathname)
        navigate("/");
        }
    }, [isAuthenticated, navigate, location.pathname]);
    
    return null; // This component does not render anything
    }

export default AuthChecker;