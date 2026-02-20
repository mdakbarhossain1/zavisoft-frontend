"use client";

import { useAppSelector } from "@/redux/hooks";
import Container from "@/components/layout/Container";

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <Container>
      <h1 className="text-3xl font-bold py-10">Shopping Cart</h1>

      {cartItems.length === 0 && <p>Your cart is empty</p>}

      {cartItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b py-6"
        >
          <div className="flex gap-6 items-center">
            <img src={item.image} className="w-24 h-24 object-cover rounded" />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p>Color: {item.color}</p>
              <p>Size: {item.size}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          </div>

          <p className="font-semibold">${item.price * item.quantity}</p>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="text-right mt-10 text-2xl font-bold">
          Total: ${total}
        </div>
      )}
    </Container>
  );
}
