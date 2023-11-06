import React, { useEffect } from "react";
import cart from "/shopping-cart.png";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../global/authStore";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";

const Cart = () => {
  const token = useAuthStore((state) => state.token);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_api_url + "cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [token, refetch]);

  console.log(data);
  return (
    <div className="relative cursor-pointer">
      <img src={cart} className="w-7" alt="" />
      {token && data && (
        <div className="absolute bg-red-500 text-center rounded-full w-4 text-xs bottom-5 left-5 text-white">
          {data.data.length > 0 && data.data.length}
        </div>
      )}
    </div>
  );
};

export default Cart;
