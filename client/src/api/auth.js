import axios from 'axios';

// ? Se crea la direccion para enviar el form al backend por medio de peticion axios
const api = 'http://localhost:4000/api';

export const registerRequest = async (user) => {
  try {
    const res = await axios.post(`${api}/person`, user);
    console.log('res.data.body[0]', res.data.body[0]);
    const returned = res.data.body[0];
    return returned;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // El usuario ya existe, maneja este caso específico
      console.log('Usuario ya existe');
      throw new Error('Usuario ya existe');
    } else {
      // Manejar otros errores
      console.error('Error en la solicitud:', error);
      throw new Error('Error en la solicitud');
    }
  }
}
export const createPassword = async (pass) => {
  try {
    const res = await axios.post(`${api}/auth`, pass);
    console.log(`response of createPassword: ${res}`);
    return res;
  } catch (error) {
    throw new Error(error);
  }
} 