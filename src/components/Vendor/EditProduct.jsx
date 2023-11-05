import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../../global/authStore";
import { ToastContainer, toast } from "react-toastify";
import { toastTheme } from "../toast";
import Loader from "../Loader";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = ({ setEdit, product }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const token = useAuthStore((state) => state.token);

  const addProductMutation = async (payload) => {
    const response = await axios.put(
      import.meta.env.VITE_api_url + "products/" + product.id,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  };
  console.log(product);
  const mutation = useMutation({
    mutationFn: addProductMutation,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Product edited", toastTheme);
      setEdit(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      const response = await axios.get(
        import.meta.env.VITE_api_url + "category"
      );
      return response.data;
    },
  });
  console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();

    const priceRegex = /^[0-9]+$/;
    if (productPrice && !priceRegex.test(productPrice)) {
      return toast.error("Price should be all numbers", toastTheme);
    }

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_price", productPrice);
    formData.append("image", productImage);
    formData.append("product_description", productDescription);
    formData.append("product_category", productCategory);

    mutation.mutate(formData);
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-[1000]">
        <div className="modal modal-open">
          <div className="modal-box">
            <form method="POST">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  placeholder={product.product_name}
                  className="input input-bordered"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Price</span>
                </label>
                <input
                  type="text"
                  placeholder={product.product_price}
                  className="input input-bordered"
                  required
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Image</span>
                </label>
                <input
                  type="file"
                  placeholder="Product Image"
                  className="file-input w-full max-w-xs"
                  required
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Description</span>
                </label>
                <textarea
                  type="textarea"
                  placeholder={product.product_description}
                  className="textarea textarea-bordered"
                  required
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Category</span>
                </label>
                <select
                  className="select w-full max-w-xs"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <option disabled value="">
                    Pick your Category
                  </option>
                  {isLoading && <Loader />}
                  {data ? (
                    data.data.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))
                  ) : (
                    <Loader />
                  )}
                </select>
              </div>
              <div className="modal-action">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditProduct;
