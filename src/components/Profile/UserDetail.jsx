import React from "react";
import useAuthStore from "../../global/authStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader";
import Error from "../Error";

const UserDetail = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const { isLoading, error, data } = useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      const response = await axios.get(
        import.meta.env.VITE_api_url +
          `${user.role === 1 ? "customer" : "vendor"}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div className="flex flex-col gap-5 items-center p-5 bg-base-200">
      <div className="rounded-full">
        <img src={user.image} alt="image" className="rounded-full" />
      </div>
      <div className="divider"></div>
      <ul className="flex flex-col gap-5 font-semibold text-lg items-start justify-between">
        <li>Name: {user.role === 1 ? user.firstName : user.vendor_name}</li>
        <li>Email: {user.email}</li>
        {user.role === 2 && <li>Address: {user.location}</li>}
        <li>Contact: +977-{user.contact}</li>
      </ul>
      <div className="flex ml-[75rem] gap-5 items-center">
        <button className="btn btn-primary">Edit Profile</button>
        <button className="btn bg-red-500 text-white">Delete Account</button>
      </div>
    </div>
  );
};

export default UserDetail;
