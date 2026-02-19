"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "@/features/cart/cartSelectors";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/features/cart/cartSlice";

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  if (items.length === 0)
    return <div className="p-6">Your cart is empty.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {items.map((item) => (
        <div
          key={item.productId}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <h2>{item.title}</h2>
            <p>${item.price}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => dispatch(decreaseQuantity(item.productId))}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(increaseQuantity(item.productId))}>
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => dispatch(removeFromCart(item.productId))}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 font-bold text-xl">
        Total: ${total?.toFixed(2)}
      </div>

      <button
        onClick={() => dispatch(clearCart())}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Clear Cart
      </button>
    </div>
  );
}
