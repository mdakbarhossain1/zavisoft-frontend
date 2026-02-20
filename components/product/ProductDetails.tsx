"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/axios";
import { Product } from "@/types/product";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";
import Container from "@/components/layout/Container";
import { useParams } from "next/navigation";

const sizes = ["S", "M", "L", "XL"];
const colors = ["Black", "White", "Red", "Blue"];

export default function ProductDetails() {
  const params = useParams();
  const id = params?.id; // this will correctly be "3"
  console.log("id:", id);
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
        setProduct(null); // or show "Product not found"
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
      }),
    );
  };

  return (
    <Container>
      <div className="grid grid-cols-2 gap-16 py-16">
        <img
          src={product.images[0]}
          className="w-full h-125 object-cover rounded-xl"
        />

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500 mt-4">{product.description}</p>
          <p className="text-2xl font-semibold mt-6">${product.price}</p>

          {/* Color Selection */}
          <div className="mt-8">
            <h4 className="font-semibold mb-2">Select Color</h4>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedColor === color ? "bg-black text-white" : ""
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Select Size</h4>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size ? "bg-black text-white" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-8 bg-black text-white px-6 py-3 rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Container>
  );
}
