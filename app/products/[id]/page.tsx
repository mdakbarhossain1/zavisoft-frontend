"use client";

import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/features/api/productApi";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) return <div>Loading product...</div>;
  if (isError) return <div>Error loading product.</div>;
  if (!data) return <div>Product not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={data.images[0]}
        alt={data.title}
        className="w-full h-96 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{data.title}</h1>
      <p className="text-xl text-blue-600 mt-2">${data.price}</p>
      <p className="mt-4 text-gray-600">{data.description}</p>
    </div>
  );
}
