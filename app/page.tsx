"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { useGetProductsQuery } from "@/features/api/productApi";

export default function HomePage() {
  const { data, isLoading, isError } = useGetProductsQuery({});
  const dispatch = useDispatch();

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Something went wrong!</div>;
  if (!data || data.length === 0) return <div>No products found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {data.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <Link href={`/products/${product.id}`}>
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-48 w-full object-cover rounded cursor-pointer"
            />
          </Link>

          <h2 className="font-semibold mt-3">{product.title}</h2>
          <p className="text-gray-500">${product.price}</p>

          <button
            onClick={() =>
              dispatch(
                addToCart({
                  productId: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.images[0],
                })
              )
            }
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
