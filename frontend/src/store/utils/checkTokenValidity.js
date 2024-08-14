import { jwtDecode } from 'jwt-decode';

const checkTokenValidity = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
        localStorage.removeItem('authToken');
        return false;
    }
    return true;
}

export default checkTokenValidity;
