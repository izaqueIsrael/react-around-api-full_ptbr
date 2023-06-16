import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function ProtectedRoute({ children, loggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  return currentUser && loggedIn ? children : <Navigate to='/signin' />;
};

export default ProtectedRoute;