import axios from "./axios";

export const showUsersRequest = async () => axios.get('/users');

export const createUserRequest = async (user) => axios.post('/person/complete', user);

export const updatePersonRequest = async (user) => axios.patch('/person', user);
export const updateUserRequest = async (user) => axios.patch('/users', user);

// export const deleteUserRequest = async (user) => axios.delete('/person', user);
export const deleteUserRequest = async (user) => {
  try {
    // Realizar la solicitud de eliminación y devolver el resultado
    const response = await axios.delete(`/person/${user.id}`, user);
    return response;
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    throw error; // Opcional: lanzar el error para que sea manejado por el código que llama a esta función
  }
};

// ROLE
export const getRolesRequest = async () => axios.get('/roles');