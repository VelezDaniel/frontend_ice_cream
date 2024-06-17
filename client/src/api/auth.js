import axios from "./axios";

export const registerRequest = async (user) => axios.post(`/person`, user);

export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const createPassword = async (pass) => {
  try {
    const res = await axios.post(`/auth`, pass);
    return res;
  } catch (error) {
    console.log(error);
  }
} 

export const verifyTokenRequest = async () => axios.post(`/auth/verify`);