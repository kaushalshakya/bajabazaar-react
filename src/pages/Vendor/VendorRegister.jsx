import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { toastTheme } from "../../components/toast";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VendorRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [vendor_name, setVendorName] = useState("");
  const [vendor_location, setVendorLocation] = useState("");
  const [contact, setContact] = useState("");

  const navigate = useNavigate();

  const registerMutation = async (payload) => {
    const response = await axios.post(
      import.meta.env.VITE_api_url + "vendor-auth/register",
      payload
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: registerMutation,
    onSuccess: (data) => {
      toast.success(data.message, toastTheme);
      setTimeout(() => navigate("/vendor/login"), 300);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !vendor_name ||
      !vendor_location ||
      !contact
    ) {
      return toast.error("Enter all fields", toastTheme);
    }
    if (password !== confirmPassword) {
      return toast.error(
        "Password and confirm password do not match",
        toastTheme
      );
    }

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
      return toast.error("Email is invalid", toastTheme);
    }

    const contactRegex = /^[0-9]+$/;

    if (!contactRegex.test(contact)) {
      return toast.error("Contact number should be all numbers", toastTheme);
    }
    if (contact.length < 10 || !contact.startsWith("9")) {
      return toast.error("Invalid contact number", toastTheme);
    }

    const payload = {
      email,
      password,
      vendor_name,
      vendor_location,
      contact,
    };

    mutation.mutate(payload);
  };
  return (
    <div className="hero pt-20">
      <ToastContainer />
      <div className="hero-content flex-col lg:flex-row items-center justify-between gap-[20rem]">
        <div className="text-center lg:text-left w-full">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Create your account here and sell your products!
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body h-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Vendor Name</span>
              </label>
              <input
                type="text"
                placeholder="Vendor Name"
                className="input input-bordered"
                required
                value={vendor_name}
                onChange={(e) => setVendorName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Vendor Location</span>
              </label>
              <input
                type="text"
                placeholder="Vendor Location"
                className="input input-bordered"
                required
                value={vendor_location}
                onChange={(e) => setVendorLocation(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contact</span>
              </label>
              <input
                type="text"
                placeholder="Contact"
                className="input input-bordered"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label className="label">
                <Link to={"/register"}>
                  <a href="#" className="label-text-alt link link-hover">
                    Register as Customer
                  </a>
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleRegister}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
