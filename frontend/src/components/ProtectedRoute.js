import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function ProtectedRoute({ children }) {
  const currentUser = useContext(CurrentUserContext);
  return currentUser ? children : <Navigate to='/signin' />;
};

export default ProtectedRoute;