"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ProductCard from "@/components/product/ProductCard";
import Container from "@/components/layout/Container";
import { fetchProducts } from "@/redux/features/productsSlice";
import HeroSlider from "@/components/home/HeroSlider";
import CategoriesSlider from "@/components/home/CategoriesSlider";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <HeroSlider />
      <Container>
        <div className="grid grid-cols-4 gap-6 py-16">
          {items.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <CategoriesSlider />
      </Container>
    </>
  );
}
