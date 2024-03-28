import axios from "axios";

const api = 'http://localhost:3000/api';

export const showUsers = async () => axios.get(`${api}/users`);
