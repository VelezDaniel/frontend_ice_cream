import axios from './axios';

//  Se crea la direccion para enviar el form al backend por medio de peticion axios
export const showProductsRequest = async () => axios.get(`/products`);

export const createProductRequest = async (product) => axios.post('/products', product);

export const deleteProductRequest = async (product) => {
  try {
    const response =  await axios.delete(`/products/${product.id}`, product);
    return response;
  } catch (error) {
    console.log('error for request: ',error);
  }
}

// QUERYS TIPO DE PRODUCTO
export const getProductsTypeRequest = async () => axios.get('/products');