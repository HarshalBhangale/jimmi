/* eslint-disable no-useless-catch */
import axios from '../index';
import routes from '../routes';

export interface OtpResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: {
      id: string;
      phone: string;
      firstName?: string;
      lastName?: string;
      userStatus: string;
    };
  };
}

export const generateOtp = async (phoneNumber: string): Promise<OtpResponse> => {
  try {
    const response = await axios.post(routes.otp.generate.path, {
      phoneNumber
    });
    return {
      success: true,
      message: response.data.message || 'OTP sent successfully'
    };
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (phoneNumber: string, otp: string): Promise<OtpResponse> => {
  try {
    const response = await axios.post(routes.otp.verify.path, {
      phoneNumber,
      otp,
      referrer: localStorage.getItem('refBy') || null
    });
    return {
      success: true,
      message: response.data.message || 'OTP verified successfully',
      data: {
        token: response.data.token,
        user: response.data.user
      }
    };
  } catch (error) {
    throw error;
  }
}; 

export const checkAuth = async (): Promise<{ success: boolean; data: any }> => {
  try {
    const response = await axios.get(routes.auth.profile.path);
    return {
      success: true,
      data: response.data.user
    }
    
  } catch (error) {
    throw error;
  }
};