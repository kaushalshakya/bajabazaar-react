import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { toastTheme } from "../../components/toast";
import "react-toastify/dist/ReactToastify.css";

const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Email is required", toastTheme);
    }
    if (!password) {
      return toast.error("Password is required", toastTheme);
    }
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
      return toast.error("Email is invalid", toastTheme);
    }
  };

  return (
    <div className="hero bg-base-200 pt-32">
      <ToastContainer />
      <div className="hero-content flex-col lg:flex-row items-center justify-between gap-[20rem]">
        <div className="text-center lg:text-left w-full">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Login here and sell your products!</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body h-full">
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
                placeholder="password"
                className="input input-bordered"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
