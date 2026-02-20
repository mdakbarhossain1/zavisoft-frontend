import { api } from "./axios";
import { Category } from "@/types/category";

export const fetchCategoriesAPI = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>("/categories");
  return data;
};
