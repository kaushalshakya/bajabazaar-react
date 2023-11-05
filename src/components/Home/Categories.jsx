import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader";
import Error from "../Error";

const Categories = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      const response = await axios.get(
        import.meta.env.VITE_api_url + "category"
      );
      console.log(response.data);
      return response.data.data;
    },
  });

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-3xl font-bold">Our Categories</h1>
      {isLoading && <Loader />}
      {error && <Error message={error.message} />}
      <div className="carousel rounded-box w-full">
        {data ? (
          data.map((category) => (
            <div
              key={category.id}
              className="carousel-item w-1/4 flex flex-col items-center gap-5"
            >
              <img
                src={
                  import.meta.env.VITE_image_url +
                  "category/" +
                  category.category_image
                }
                className="w-[20rem] h-[20rem]"
                alt={category.category_name}
              />
              <h1 className="text-lg font-bold">{category.category_name}</h1>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Categories;
