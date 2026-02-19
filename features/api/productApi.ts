import { baseApi } from "./baseApi";
import { Product } from "@/types/product.types";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], { categoryId?: number }>({
      query: ({ categoryId }) =>
        categoryId
          ? `products/?categoryId=${categoryId}`
          : "products",
      providesTags: ["Products"],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productApi;
