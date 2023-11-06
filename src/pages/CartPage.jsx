import React, { useState } from "react";
import useAuthStore from "../global/authStore";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";

const CartPage = () => {
  const [count, setCount] = useState(0);
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <div>Unauthenticated</div>;
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_api_url + "cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  console.log("cart page", data.data);

  const totalAmount = data.data.reduce((accumulator, currentVal) => {
    return accumulator + parseInt(currentVal.total_amount);
  }, 0);

  console.log(count + 1);

  const updateCart = (id, quantity) => {};
  const deleteCart = (id, quantity) => {};
  const mutation = useMutation({
    mutationFn: count + 1 > 0 ? updateCart : deleteCart,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className="overflow-x-auto py-10 px-20 flex flex-col gap-10">
      <div className="font-bold text-2xl"> Total: {totalAmount}</div>
      <table className="table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Product Quantity</th>
            <th>Product Rate</th>
            <th>Total Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((content) => (
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={
                          import.meta.env.VITE_image_url +
                          "products/" +
                          content.product.product_image
                        }
                        alt="Avatar Tailwind CSS Component"
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{content.product.product_name}</td>
              <td className="flex items-center gap-5">
                <p
                  className="font-bold text-lg cursor-pointer"
                  onClick={() => {
                    setCount(content.quantity--);
                  }}
                >
                  -
                </p>
                {content.quantity}
                <p
                  className="font-bold text-lg cursor-pointer"
                  onClick={() => {
                    setCount(content.quantity++);
                  }}
                >
                  +
                </p>
              </td>
              <td>{content.product.product_price}</td>
              <td>{content.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
