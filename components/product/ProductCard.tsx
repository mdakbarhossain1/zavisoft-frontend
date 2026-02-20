"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";
import Link from "next/link";

const COLORS = ["Black", "White", "Red", "Blue"];
const SIZES = ["S", "M", "L", "XL"];

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select color and size");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize,
      }),
    );
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="border p-4 rounded-xl">
        <img
          src={product.images[0]}
          className="h-50 w-full object-cover rounded"
          alt={product.title}
        />
        <h3 className="mt-3 font-semibold">{product.title}</h3>
        <p className="text-gray-500">${product.price}</p>

        {/* Color Selection */}
        <div className="flex gap-2 mt-2">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-2 py-1 border rounded ${
                selectedColor === color ? "bg-black text-white" : ""
              }`}
            >
              {color}
            </button>
          ))}
        </div>

        {/* Size Selection */}
        <div className="flex gap-2 mt-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-2 py-1 border rounded ${
                selectedSize === size ? "bg-black text-white" : ""
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-black text-white px-4 py-2 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
