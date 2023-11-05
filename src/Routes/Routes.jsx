import React from "react";
import { Routes as Endpoints, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Register from "../pages/Customer/Register";
import Login from "../pages/Customer/Login";
import VendorLogin from "../pages/Vendor/VendorLogin";
import VendorRegister from "../pages/Vendor/VendorRegister";
import Profile from "../pages/Profile";

const Routes = () => {
  return (
    <div>
      <Navbar>
        <Endpoints>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/vendor">
            <Route path="login" element={<VendorLogin />}></Route>
            <Route path="register" element={<VendorRegister />}></Route>
          </Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Endpoints>
      </Navbar>
    </div>
  );
};

export default Routes;
