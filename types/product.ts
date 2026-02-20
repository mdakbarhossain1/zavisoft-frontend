import { Category } from "./category";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt: string;
  updatedAt: string;
}

export type Size = "S" | "M" | "L" | "XL";

export interface ProductVariant {
  color: string;
  size: Size;
}
