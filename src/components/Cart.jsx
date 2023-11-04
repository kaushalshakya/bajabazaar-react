import React from "react";
import cart from "/shopping-cart.png";

const Cart = () => {
  return (
    <div className="relative cursor-pointer">
      <img src={cart} className="w-7" alt="" />
      <div className="absolute bg-red-500 text-center rounded-full w-4 text-xs bottom-5 left-5 text-white">
        1
      </div>
    </div>
  );
};

export default Cart;
