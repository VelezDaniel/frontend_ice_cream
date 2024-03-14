import axios from 'axios';

// ? Se crea la direccion para enviar el form al backend por medio de peticion axios
const api = 'http://localhost:3000/api';

export const showProducts = async () => axios.get(`${api}/products`);
