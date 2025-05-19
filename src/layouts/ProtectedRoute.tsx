import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticatedAtom } from '@/jotai/atoms';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/signup/step-2');
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default ProtectedRoute;