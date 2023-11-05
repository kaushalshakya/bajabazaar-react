import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import Error from "../Error";

const ProductList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getHomeProducts"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_api_url + "home");
      console.log(response);
      return response.data.products;
    },
  });
  console.log(data);
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
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ProductList;
