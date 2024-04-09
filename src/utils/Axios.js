/* eslint-disable max-len */
// import axios from "axios";

import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1";
export const AxiosInstance = axios.create({ baseURL: BASE_URL });

export const GetCategory = async () => {
  const res = await AxiosInstance.get("/categories");
  return res.data;
};

export const CreateProduct = async (formData) => {
  const res = await AxiosInstance.post("/products/", formData);
  return res.data;
};

export const GetProducts = async () => {
  const res = await AxiosInstance.get("/products");
  return res.data;
};

export const DeleteProducts = async (id) => {
  const res = await AxiosInstance.delete(`/products/${id}`);
  return res.data;
};
export const DetailsProducts = async (id) => {
  const res = await AxiosInstance.get(`/products/${id}`);
  return res.data;
};

export const updateProducts = async (updateProduct) => {
  const res = await AxiosInstance.put(`/products/${updateProduct.id}`, updateProduct);
  return res.data;
};

// const GetDatas = async (currentPage, pageSize, searchTerm = "") => {
//   const res = await AxiosInstance.get(`/products/?title=${searchTerm}&offset={currentPage}&limit={pageSize}`);
//   return res.data;
// };
