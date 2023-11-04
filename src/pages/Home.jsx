import React from "react";
import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";

const Home = () => {
  return (
    <div className="flex flex-col gap-14 p-10">
      <Banner />
      <Categories />
    </div>
  );
};

export default Home;
