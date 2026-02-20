import { api } from "./axios";

export const fetchProductsAPI = async () => {
  const res = await api.get("/products");
  return res.data;
};
