import axios from './axios';

//  Se crea la direccion para enviar el form al backend por medio de peticion axios
export const showBookingsRequest = async () => axios.get(`/bookings`);

// export const showUserBookingsRequest = async () => axios.get(`/userBooks`);
export const showUserBookingsRequest = async (user) => {
  try {
    const result = await axios.get(`/bookings/userbooks/${user.id}`, user);
    console.log('result bookings user: ', result)
    return result;
  } catch (error) {
    console.log('Error in bookings.js: ', error);
  }
}

export const createBookingRequest = async (booking) => axios.post('/bookings', booking);

export const deleteBookingRequest = async (booking) => {
  try {
    const response =  await axios.delete(`/bookings/${booking.id}`, booking);
    return response;
  } catch (error) {
    console.log('error for request: ',error);
  }
}