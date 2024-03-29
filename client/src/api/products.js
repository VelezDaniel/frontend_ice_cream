import axios from './axios';

//  Se crea la direccion para enviar el form al backend por medio de peticion axios
export const showProducts = async () => axios.get(`/products`);
