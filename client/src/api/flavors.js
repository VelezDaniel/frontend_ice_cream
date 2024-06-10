import axios from './axios';

//  Se crea la direccion para enviar el form al backend por medio de peticion axios
export const showFlavorsRequest = async () => axios.get(`/flavors`);

export const createFlavorRequest = async (flavor) => axios.post('/flavors', flavor);

export const deleteFlavorRequest = async (flavor) => {
  try {
    const response = await axios.delete(`/flavors/${flavor.id}`, flavor);
    return response;
  } catch (error) {
    console.log('error for request: ', error);
  }
}

export const insertDetailflavorsOrder = async (detailFlavor) => axios.post('/flavors/detail-flavor', detailFlavor);