import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../../global/authStore";
import { useMutation } from "@tanstack/react-query";
import { toastTheme } from "../toast";
import axios from "axios";

const DeleteProduct = ({ setDeleteProduct, toDelete }) => {
  console.log(toDelete);
  const token = useAuthStore((state) => state.token);

  const deleteProduct = async (id) => {
    const response = await axios.delete(
      import.meta.env.VITE_api_url + "products/" + id,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Product deleted successfully", toastTheme);
      setDeleteProduct(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleDelete = () => {
    mutation.mutate(toDelete.id);
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-[1000]">
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl mb-1 font-bold">Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setDeleteProduct(false)}
              >
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

export default DeleteProduct;
