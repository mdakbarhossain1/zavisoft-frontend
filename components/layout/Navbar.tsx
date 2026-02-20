"use client";

import { useAppSelector } from "@/redux/hooks";
import Container from "./Container";
import { ShoppingCart, User, Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const cartCount = useAppSelector((state) => state.cart.items.length);

  return (
    <div className="border-b shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Left Menu */}
          <div className="flex gap-6 font-medium">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/categories">Categories</Link>
          </div>

          {/* Center Logo */}
          <div className="text-2xl font-bold">
            <Link href="/">MyStore</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 relative">
            <Search className="cursor-pointer" />
            <User className="cursor-pointer" />
            <Link href="/cart">
              <div className="relative cursor-pointer">
                <ShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
