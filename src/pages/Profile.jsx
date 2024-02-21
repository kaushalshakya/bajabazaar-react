import React, { useState } from "react";
import ProductProfile from "../components/Profile/ProductProfile";
import UserDetail from "../components/Profile/UserDetail";
import useAuthStore from "../global/authStore";

const Profile = () => {
  const [radio, setRadio] = useState("Profile");
  const handleChange = (e) => {
    setRadio(e.target.value);
  };
  const token =
    useAuthStore((state) => state.token) || localStorage.getItem("token");

  if (!token) {
    return <h1>Unauthenticated</h1>;
  }
  return (
    <div className=" px-20 py-10 flex flex-col items-center justify-center">
      <div className="flex">
        <input
          className="btn w-1/2"
          type="radio"
          name="Products"
          value="Products"
          checked={radio === "Products"}
          aria-label="Products"
          onChange={handleChange}
        />
        <input
          className="btn w-1/2"
          type="radio"
          name="Profile"
          value="Profile"
          checked={radio === "Profile"}
          aria-label="Profile"
          onChange={handleChange}
        />
      </div>
      <div className="bg-base-100 w-full">
        {radio === "Products" ? <ProductProfile /> : <UserDetail />}
      </div>
    </div>
  );
};

export default Profile;
