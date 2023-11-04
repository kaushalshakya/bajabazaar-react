import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../global/authStore";
import { useMutation } from "@tanstack/react-query";
import { toastTheme } from "./toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmLogout = ({ setLogout }) => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const logoutConfirm = async () => {
    const response = await axios.post(
      import.meta.env.VITE_api_url +
        `${user.role === 1 ? "customer-auth" : "vendor-auth"}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const { setUser, setIsAuthenticated, setToken } = useAuthStore();

  const mutation = useMutation({
    mutationFn: logoutConfirm,
    onSuccess: (data) => {
      setUser(null);
      setIsAuthenticated(false);
      setToken(null);
      setIsAuthenticated(false);
      toast.success(data.message, toastTheme);
      setTimeout(() => {
        navigate("/", 3000);
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message, toastTheme);
    },
  });

  const handleLogout = () => {
    mutation.mutate();
    setLogout(false);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };
  const cancelLogout = () => {
    setLogout(false);
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-[1000]">
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl mb-1 font-bold">Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleLogout}>
                Yes, Logout
              </button>
              <button className="btn btn-ghost" onClick={cancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ConfirmLogout;
