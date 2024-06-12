import axios from './axios';

//  Se crea la direccion para enviar el form al backend por medio de peticion axios
export const showOrdersRequest = async () => axios.get(`/orders`);

export const showOrdersByUser = async (userId) => axios.get(`/orders/${userId}`);

export const createOrderProductRequest = async (order) => axios.post('/orders', order);

export const createNewOrderRequest = async (newOrder) => axios.post('/orders/new-order', newOrder);

export const deleteOrderRequest = async (order) => {
  try {
    const response =  await axios.delete(`/orders/${order.id}`, order);
    return response;
  } catch (error) {
    console.log('error for request: ',error);
  }
}