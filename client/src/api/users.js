import axios from "./axios";

export const showUsersRequest = async () => axios.get('/users');

export const createUserRequest = async (user) => axios.post('/person/complete', user);

export const updatePersonRequest = async (user) => axios.patch('/person', user);
export const updateUserRequest = async (user) => axios.patch('/users', user);

export const deleteUserRequest = async (user) => axios.delete(`/person/${user.id}`, user);