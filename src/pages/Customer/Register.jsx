import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { toastTheme } from "../../components/toast";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      !first_name ||
      !last_name ||
      !contact ||
      !confirmPassword
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
    return toast.success("Register", toastTheme);
  };
  return (
    <div className="hero ">
      <ToastContainer />
      <div className="hero-content flex-col lg:flex-row items-center justify-between gap-[20rem]">
        <div className="text-center lg:text-left w-full">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">Create your account here and join us!</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body h-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered"
                required
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered"
                required
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contact Number</span>
              </label>
              <input
                type="text"
                placeholder="Contact Number"
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
                <Link to={"/vendor/register"}>
                  <span className="label-text-alt link link-hover">
                    Register as Vendor
                  </span>
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleRegister}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
