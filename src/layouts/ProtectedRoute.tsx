import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { userAtom } from '@/jotai/atoms';

import { isAuthenticatedAtom } from '@/jotai/atoms';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  useEffect(() => {
    if (currentPath === "/auth/login" || currentPath === "/auth/signup/step-1") {
      return;
    }
    if (!isAuthenticated) {
      navigate('/auth/signup/step-1');
    } else {
      if (user.userStatus === "Paid") {
        navigate('/dashboard');
      }
      else if (user.stage === "lenders") {
        navigate('/auth/signup/step-4');
      } else if (user.stage === "profile") {
        navigate('/auth/signup/step-5');
      } else if (user.stage === "identity") {
        navigate('/auth/signup/step-6');
      } else {
        navigate('/auth/signup/step-3');
      }
    }

  }, [isAuthenticated, navigate]);

  return children;
};

export default ProtectedRoute;