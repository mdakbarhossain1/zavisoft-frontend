"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/services/axios";
import Container from "../layout/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  id: number;
  name: string;
  image: string;
}

export default function CategoriesSlider() {
  const [categories, setCategories] = useState<Category[]>([]);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Shop by Category
          </h2>

          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow-sm hover:bg-black hover:text-white transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              ref={nextRef}
              className="w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow-sm hover:bg-black hover:text-white transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={4}
          breakpoints={{
            1280: { slidesPerView: 4 },
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1.2 },
          }}
          onBeforeInit={(swiper: SwiperType) => {
            if (
              typeof swiper.params.navigation !== "boolean" &&
              swiper.params.navigation
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer">
                <div className="overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
