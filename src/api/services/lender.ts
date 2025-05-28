
import axiosClient from '../index';
import routes from '../routes';

export const getLenders = async () => {
  const response = await axiosClient.get(routes.lenders.getAll.path);
  return response.data;
};

export const addLenders = async (lenders: string[]) => {
  const response = await axiosClient.patch(routes.profile.update.path, { lenders });
  return response.data;
};

export const requestDocument = async (data: any) => {
  const response = await axiosClient.post(routes.lenders.documentRequest.path, data);
  return response.data;
};