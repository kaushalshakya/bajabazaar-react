import React, { useState } from "react";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import useAuthStore from "../global/authStore";
import defaultProfile from "/defaultProfile.jpg";
import ConfirmLogout from "./ConfirmLogout";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children }) => {
  const [logout, setLogout] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const navigate = useNavigate();

  return (
    <>
      <div className="drawer flex flex-col max-w-screen">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="flex items-center lg:border z-20 lg:fixed lg:top-0 lg:w-screen justify-between bg-base-100 p-[1rem] ">
            <div className="flex flex-row lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <Link to={"/"}>
              <div className="block w-[150px] mr-4 2xl:ml-4 cursor-pointer">
                <img src={logo} className="w-16" />
              </div>
            </Link>

            <div className="flex-none hidden lg:flex text-primary lg:ml-[51px]">
              <ul className="menu menu-horizontal font-bold text-lg flex items-center gap-5">
                <Link to={"/"}>
                  <li className="text-base cursor-pointer">Home</li>
                </Link>
                <Link to={"/products"}>
                  <li className="text-base cursor-pointer">All Products</li>
                </Link>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-24 rounded-full md:w-auto"
                  />
                </div>
              </ul>
            </div>
            <div className="flex-none hidden items-center font-bold lg:flex gap-5 px-5">
              {user ? (
                <Link to={"/profile"}>
                  <p className="text-primary">
                    <span className="font-normal">Hello</span>{" "}
                    {user.role === 1 ? user.firstName : user.vendor_name}
                  </p>
                </Link>
              ) : (
                <Link to={"/register"}>
                  <button
                    type="button"
                    className="btn btn-ghost text-base text-primary font-bold normal-case"
                  >
                    Register
                  </button>
                </Link>
              )}
              {user && user.role === 1 && (
                <div onClick={() => navigate("/cart")}>
                  <Cart />
                </div>
              )}
              {user ? (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img src={user.image ? user.image : defaultProfile} />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-30 p-2 shadow menu menu-sm dropdown-content text-primary rounded-box w-52"
                  >
                    <li>
                      <Link to={"/profile"}>
                        <p className="justify-between">Profile</p>
                      </Link>
                    </li>
                    <li>
                      <p onClick={() => setLogout(true)}>Logout</p>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to={"/login"}>
                  <button
                    type="button"
                    className="btn btn-ghost text-base text-primary font-bold normal-case"
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="max-w-screen mt-[20px] z-10 lg:pt-[4.5rem]">
          {children}
        </div>
        <div className="drawer-side z-40">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full  text-primary font-normal normal-case">
            <Link to={"/"}>
              <li className="cursor-pointer rounded-full">
                {" "}
                <img
                  src={logo}
                  alt="Market Place Nepal"
                  className="rounded-[100%] w-[6rem] ml-[6rem]"
                />
              </li>
            </Link>
            <p className="divider"></p>
            <Link to={"/"}>
              <li className="text-base cursor-pointer">Home</li>
            </Link>
            <p className="divider"></p>
            <Link to={"/about"}>
              <li className="text-base cursor-pointer">About Us</li>
            </Link>
            <p className="divider"></p>
            <Link to={"/contact"}>
              <li className="text-base cursor-pointer">Contact Us</li>
            </Link>
            <p className="divider"></p>
            <Link to={"/privacy-policy"}>
              <li className="text-base cursor-pointer">Privacy Policy</li>
            </Link>
            <p className="divider"></p>
            <Link to={"/advertise"}>
              <li className="text-base cursor-pointer">Advertise with Us</li>
            </Link>
            <p className="divider"></p>
            <Link to={"/register"}>
              <li className="text-base cursor-pointer">Be a Contributor</li>
            </Link>
            <p className="divider"></p>
            {user ? (
              <>
                <Link to={"/profile"}>
                  <li className="text-base cursor-pointer">View Profile</li>
                </Link>
                <p className="divider"></p>
              </>
            ) : (
              <>
                {" "}
                <Link to={"/login"}>
                  <li className="text-base cursor-pointer text-primary font-normal normal-case">
                    Login
                  </li>
                </Link>
                <p className="divider"></p>
              </>
            )}
            {user && (
              <>
                <li
                  className="text-base cursor-pointer"
                  onClick={() => setLogout(true)}
                >
                  Logout
                </li>
                <p className="divider"></p>
              </>
            )}
          </ul>
        </div>
      </div>
      {logout && <ConfirmLogout setLogout={setLogout} />}
    </>
  );
};

export default Navbar;
