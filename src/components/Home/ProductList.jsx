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
      <div className="carousel rounded-box w-full"></div>
    </div>
  );
};

export default ProductList;
