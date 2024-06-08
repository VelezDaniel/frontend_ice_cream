import axios from './axios';

export const createOrderRequest = async (orderInfo) => axios.post('/payment/create-order', orderInfo);

export const captureOrderRequest = async (token) => axios.get(`/payment/capture-order?token=${token}`);