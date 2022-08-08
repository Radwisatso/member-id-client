import { Navigate, useLocation } from "react-router-dom"

export function RequireAuth({ children }) {
    const location = useLocation();
    const email = localStorage.getItem('email');

    return email ? children : <Navigate to='/' replace state={{ path: location.pathname }} />
}