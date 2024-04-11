import axios from './axios';

//  Se crea la direccion para enviar el form al backend por medio de peticion axios
export const showAditionsRequest = async () => axios.get(`/aditions`);

export const createAditionRequest = async (adition) => axios.post('/aditions', adition);

export const deleteAditionRequest = async (adition) => {
  try {
    const response =  await axios.delete(`/aditions/${adition.id}`, adition);
    return response;
  } catch (error) {
    console.log('error for request: ',error);
  }
}