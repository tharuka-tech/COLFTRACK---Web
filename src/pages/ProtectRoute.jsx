import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // true if user exists
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}
