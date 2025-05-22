import { createBrowserRouter, Navigate } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

import Landing from '@pages/Landing';
import Login from '@pages/auth/Login';
import Dashboard from '@pages/Dashboard';
import SignupStep1 from '@pages/auth/signup/Step1';
import SignupStep2 from '@pages/auth/signup/Step2';
import SignupStep3 from '@pages/auth/signup/Step3';
import SignupStep4 from '@pages/auth/signup/Step4';
import SignupStep5 from '@pages/auth/signup/Step5';
import SignupStep6 from '@pages/auth/signup/Step6';
import SignupStep7 from '@pages/auth/signup/Step7';
import Confirmation from '@pages/auth/signup/Confirmation';
import Success from '@pages/payments';
import LenderDetails from '@pages/LenderDetails';
import Mailbox from '@pages/mailbox';
import Privacy from '@pages/privacy';
import TNC from '@pages/tnc';
import RefundPolicy from '@pages/refund-policy';
import Profile from '@pages/Profile';
import NotFound from '@pages/NotFound';
import ProtectedRoute from '@layouts/ProtectedRoute';
const router = createBrowserRouter([
  {
    path: '/payments/success',
    element: <Success />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'signup/step-1', element: <SignupStep1 /> },
          { path: 'signup/step-2', element: <SignupStep2 /> },
          { path: 'signup/step-3', element: <SignupStep3 /> },
          { path: 'signup/step-4', element: <SignupStep4 /> },
          { path: 'signup/step-5', element: <SignupStep5 /> },
          { path: 'signup/step-6', element: <SignupStep6 /> },
          { path: 'signup/step-7', element: <SignupStep7 /> },
          { path: 'signup/confirmation', element: <Confirmation /> },
        ],
      },
      {
        path: 'dashboard',
        element: <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'lenders/:id', element: <LenderDetails /> },
          { path: 'profile', element: <Profile /> },
          { path: 'mailbox', element: <Mailbox /> },
        ],
      },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'tnc', element: <TNC /> },
      { path: 'refund-policy', element: <RefundPolicy /> },
    ],
  },
]);

export default router;
