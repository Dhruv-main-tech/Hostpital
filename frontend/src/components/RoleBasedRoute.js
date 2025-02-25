import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    if (userRole === 'patient') {
      return <Navigate to="/patient-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleBasedRoute; 