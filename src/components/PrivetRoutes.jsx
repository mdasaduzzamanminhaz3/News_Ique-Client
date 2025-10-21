import useAuthContext from '../hooks/useAuthContext';
import { Navigate } from 'react-router';

const PrivetRoutes = ({children}) => {
    const {user} = useAuthContext();
    if(user ===null) return <p>Loading...</p>
    return user ? children: <Navigate to="/login"/>
};

export default PrivetRoutes;