import axios from './axios';

//  Se crea la direccion para enviar el form al backend por medio de peticion axios
export const showDeliveriesRequest = async () => axios.get(`/deliveries`);

export const createDeliveryRequest = async (delivery) => axios.post('/deliveries', delivery);

export const deleteDeliveryRequest = async (delivery) => {
  try {
    const response =  await axios.delete(`/deliveries/${delivery.id}`, delivery);
    return response;
  } catch (error) {
    console.log('error for request: ',error);
  }
}