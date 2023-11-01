import React from "react";
import { Routes as Endpoints, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";

const Routes = () => {
  return (
    <div>
      <Navbar>
        <Endpoints>
          <Route path="/" element={<Home />}></Route>
        </Endpoints>
      </Navbar>
    </div>
  );
};

export default Routes;
