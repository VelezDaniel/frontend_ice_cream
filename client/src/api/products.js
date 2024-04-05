import axios from './axios';

//  Se crea la direccion para enviar el form al backend por medio de peticion axios
export const showProductsRequest = async () => axios.get(`/products`);

export const createProductRequest = async (product) => axios.post('/', product);