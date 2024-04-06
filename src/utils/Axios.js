/* eslint-disable max-len */
// import axios from "axios";

import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1";
export const AxiosInstance = axios.create({ baseURL: BASE_URL });

export const ProfileData = async () => {
  const res = await AxiosInstance.get("/auth/profile");
  return res.data;
};
export const GetData = async () => {
  const res = await AxiosInstance.get("/products");
  return res.data;
};
export const GetCat = async () => {
  const res = await AxiosInstance.get("/products/categories");
  return res.data;
};
export const GetCatItem = async (category) => {
  const res = await AxiosInstance.get(`/products/categories/${category}`);
  console.log(res.data);
  return res.data;
};

// const GetDatas = async (currentPage, pageSize, searchTerm = "") => {
//   const res = await AxiosInstance.get(`/products/?title=${searchTerm}&offset={currentPage}&limit={pageSize}`);
//   return res.data;
// };
