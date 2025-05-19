import axiosClient from '@/api/index';
import routes from '@/api/routes';

export const getMails = async () => {
  const response = await axiosClient.get(routes.mail.get.path);
  return response.data;
};

export const updateMailStatus = async (
  data: {
    emailId?: string;
    status?: string;
    starred?: boolean;
    markAll?: string;
  }
) => {
  const response = await axiosClient.patch(routes.mailing.updateStatus.path, {
    ...data,
  });
  return response.data;
};

