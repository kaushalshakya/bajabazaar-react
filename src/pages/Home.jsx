import React from "react";
import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";
import ProductList from "../components/Home/ProductList";

const Home = () => {
  return (
    <div className="flex flex-col gap-14 py-10 px-20">
      <Banner />
      <div className="divider"></div>
      <Categories />
      <div className="divider"></div>
      <ProductList />
      <div className="divider"></div>
    </div>
  );
};

export default Home;
