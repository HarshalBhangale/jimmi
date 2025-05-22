import axiosClient from '@/api/index';

const getTemplates = async (templateName: string) => {
  const response = await axiosClient.get('/api/templates', {
    params: {
      templateName,
    },
  });
  return response.data.data;
};

export { getTemplates };
