import React, { useCallback, useEffect, useState } from "react";
import useAuthStore from "../global/authStore";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";

const CartPage = () => {
  const [count, setCount] = useState(1);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = !!token;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_api_url + "cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return <div>Unauthenticated</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  const totalAmount = data.data.reduce((accumulator, currentVal) => {
    return accumulator + parseInt(currentVal.total_amount);
  }, 0);

  const updateCart = async (id, quantity, product_id) => {
    console.log({ id, quantity });
    const response = await axios.put(
      import.meta.env.VITE_api_url + "cart",
      {
        cart_id: id,
        quantity,
        product_id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  };
  const deleteCart = async (id) => {
    const response = await axios.delete(
      import.meta.env.VITE_api_url + `cart/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      const { id, quantity, product_id } = data;
      console.log({ data });
      return quantity > 0
        ? updateCart(id, quantity, product_id)
        : deleteCart(id);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const incrementQuantity = useCallback(
    (content) => {
      const updatedQuantity = content.quantity + 1;
      console.log({ content });
      setCount(updatedQuantity);
      mutation.mutate({
        id: content.id,
        quantity: updatedQuantity,
        product_id: content.product.id,
      });
    },
    [mutation]
  );

  const decrementQuantity = useCallback(
    (content) => {
      const updatedQuantity = content.quantity - 1;
      setCount(updatedQuantity);
      mutation.mutate({
        id: content.id,
        quantity: updatedQuantity,
        product_id: content.product.id,
      });
    },
    [mutation]
  );

  useEffect(() => {
    refetch();
  }, [count, incrementQuantity, decrementQuantity, refetch]);

  return (
    <div className="overflow-x-auto py-10 px-20 flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <div className="font-bold text-2xl"> Total: {totalAmount}</div>
        <button className="btn btn-primary">Checkout</button>
      </div>
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
            <tr key={content.product.id}>
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
                  onClick={() => decrementQuantity(content)}
                >
                  -
                </p>
                {content.quantity}
                <p
                  className="font-bold text-lg cursor-pointer"
                  onClick={() => incrementQuantity(content)}
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
