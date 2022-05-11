import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

function PrivateRoute({ children }) {
  const user = useSelector(selectCurrentUser);
  return user ? children : <Navigate to='/' />;
}

export default PrivateRoute;
