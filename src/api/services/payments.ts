import axiosClient from "@api/index"
import routes from '../routes';

export const createPaymentIntent = async (
    {
        amount,
        type,
    }: {
        amount: number;
        type: 'subscription' | 'one_time';
    }
) => {
    const res = await axiosClient.post(routes.payments.createPaymentIntent.path, {
        amount,
        type,
    });
    return res.data;
};

export const confirmPayment = async (sessionId: string) => {
    const res = await axiosClient.post(routes.payments.confirm.path, {
        sessionId,
    });
    return res.data;
};