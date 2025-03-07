import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, role }) => {
    const token = Cookies.get('token'); 

    if (!token) {
        Cookies.remove('token');
        Cookies.remove('username');
        return <Navigate to="/" />;
    }

    let decodedToken;
    try {
        decodedToken = jwtDecode(token);
    } catch (error) {
        Cookies.remove('token');
        Cookies.remove('username');
        window.location.reload();
        return <Navigate to="/" />;
    }

    const currentTime = Date.now() / 1000; 
    if (decodedToken.exp < currentTime) {
        Cookies.remove('token');
        Cookies.remove('username');
        window.location.reload();
        return <Navigate to="/" />;
    }

    const userRole = decodedToken.role; 

    if (role && userRole !== role) {
        Cookies.remove('token');
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
