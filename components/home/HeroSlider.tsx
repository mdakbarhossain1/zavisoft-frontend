// components/HeroSection.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type HeroImage = { id: string; src: string; alt: string };

export default function HeroSection() {
  const router = useRouter();

  const images: HeroImage[] = useMemo(
    () => [
      { id: "img1", src: "/hero/shoe-1.png", alt: "Nike Air Max shoe view 1" },
      { id: "img2", src: "/hero/shoe-2.png", alt: "Nike Air Max shoe view 2" },
    ],
    [],
  );

  const [activeId, setActiveId] = useState(images[0].id);
  const active = images.find((i) => i.id === activeId)!;

  const onShopNow = () => {
    // ✅ click function (choose one)
    // 1) Scroll:
    const el = document.getElementById("products");
    el?.scrollIntoView({ behavior: "smooth" });

    // 2) Or route:
    // router.push("/shop");

    console.log("SHOP NOW clicked");
  };

  return (
    <section className="relative overflow-hidden rounded-[26px] min-h-[520px]">
      {/* background */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-[1.02]"
        style={{ backgroundImage: `url(/hero/bg.jpg)` }}
      />
      {/* dark overlay (optional like screenshot contrast) */}
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-[1] grid grid-cols-1 gap-6 p-6 md:p-10 lg:p-12 lg:grid-cols-[1.1fr_1.4fr_0.5fr] items-center">
        {/* badge */}
        <div className="absolute left-4 top-4 md:left-6 md:top-6 rounded-xl bg-black/55 px-3 py-2 text-white text-[13px]">
          Nike product of the year
        </div>

        {/* LEFT */}
        <div className="text-white max-w-[520px]">
          <h1 className="m-0 font-extrabold leading-[0.98] tracking-[0.5px] text-[clamp(40px,4.2vw,76px)]">
            NIKE AIR MAX
          </h1>
          <p className="mt-3 mb-6 text-[18px] opacity-90 max-w-[420px]">
            Nike introducing the new air max for everyone&apos;s comfort
          </p>

          <button
            onClick={onShopNow}
            className="inline-flex items-center justify-center rounded-[10px] bg-[#3c63ff] px-5 py-3 text-white font-bold active:translate-y-[1px]"
          >
            SHOP NOW
          </button>
        </div>

        {/* CENTER MAIN IMAGE */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-[680px] aspect-[16/9] md:aspect-[16/9]">
            <Image
              src={active.src}
              alt={active.alt}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 55vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* RIGHT THUMBS */}
        <div className="flex gap-3 lg:flex-col lg:justify-self-end overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
          {images.map((img) => {
            const isActive = img.id === activeId;
            return (
              <button
                key={img.id}
                onClick={() => setActiveId(img.id)}
                aria-pressed={isActive}
                className={[
                  "relative shrink-0 overflow-hidden rounded-[18px] border-2",
                  "w-[96px] h-[96px] md:w-[110px] md:h-[110px] lg:w-[120px] lg:h-[120px]",
                  isActive
                    ? "border-white shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
                    : "border-white/65",
                ].join(" ")}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
