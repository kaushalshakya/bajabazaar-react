import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import Error from "../Error";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../global/authStore";
import { ToastContainer, toast } from "react-toastify";
import { toastTheme } from "../toast";

const ProductList = () => {
  const [product, setProduct] = useState(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ["getHomeProducts"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_api_url + "home");
      console.log(response);
      return response.data.products;
    },
  });

  const token =
    useAuthStore((state) => state.token) || localStorage.getItem("token");

  const addToCart = async (id) => {
    const response = await axios.post(
      import.meta.env.VITE_api_url + "cart",
      {
        product_id: id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message, toastTheme);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleAddToCart = (product) => {
    console.log(product);
    if (!token) {
      return toast.error("You need to log in first", toastTheme);
    }

    mutation.mutate(product.id);
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-3xl font-bold">Our Products</h1>
      {isLoading && <Loader />}
      {error && <Error message={error.message} />}
      {data && !data.length && (
        <h1 className="text-lg font-bold">
          No Products Available. Please visit us later
        </h1>
      )}

      <div className="carousel carousel-center p-4 space-x-4 rounded-box">
        {data ? (
          data.map((product) => (
            <div className="carousel-item">
              <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={`${import.meta.env.VITE_image_url}products/${
                      product.product_image
                    }`}
                    alt={product.product_name}
                    className="h-[10rem]"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex items-center">
                    <h2 className="card-title">{product.product_name}</h2>
                    <div className="badge badge-outline rounded-full ml-2">
                      {product.category.category_name}
                    </div>
                  </div>
                  <p>Rs. {product.product_price}</p>
                  <div className="card-actions justify-end">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProduct(product);
                        handleAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
