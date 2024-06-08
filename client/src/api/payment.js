import axios from './axios';

export const createOrderRequest = async (orderInfo) => axios.post('/payment/create-order', orderInfo);