import axios from "axios";

const BASE_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(BASE_URL, data);
  return { ...data, id: Date.now() }; 
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
