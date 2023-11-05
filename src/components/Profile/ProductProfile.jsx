import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../global/authStore";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import AddProduct from "../Vendor/AddProduct";
import editIcon from "/edit.png";
import deleteIcon from "/delete.png";
import EditProduct from "../Vendor/EditProduct";
import DeleteProduct from "../Vendor/DeleteProduct";

const ProductProfile = () => {
  const [addForm, setAddForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const token = useAuthStore((state) => state.token);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["vendorProducts"],
    queryFn: async () => {
      const response = await axios.get(
        import.meta.env.VITE_api_url + "products",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [addForm, edit, deleteProduct, refetch]);

  return (
    <>
      <div className="flex flex-col gap-5 relative items-center p-5 bg-base-200">
        <h1 className="font-bold text-2xl">My Products:</h1>
        {isLoading && <Loader />}
        {error && <Error message={error.message} />}
        {!data ||
          (!data.data.length && (
            <h1 className="font-bold text-xl">Oops! Nothing to show</h1>
          ))}
        <button
          className="btn btn-primary absolute top-3 right-5"
          type="button"
          onClick={() => setAddForm(true)}
        >
          Add Product
        </button>
      </div>
      {addForm && <AddProduct setAddForm={setAddForm} />}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>S. No</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.data.map((product, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={`${import.meta.env.VITE_image_url}products/${
                              product.product_image
                            }`}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  {edit && (
                    <EditProduct setEdit={setEdit} product={editProduct} />
                  )}
                  {deleteProduct && (
                    <DeleteProduct
                      setDeleteProduct={setDeleteProduct}
                      toDelete={toDelete}
                    />
                  )}
                  <td>{product.product_name}</td>
                  <td> Rs. {product.product_price}</td>
                  <td>{product.category.category_name}</td>
                  <td>{product.product_description}</td>
                  <td className="flex items-center">
                    <button
                      className="btn bg-yellow-500 hover:bg-yellow-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEdit(true);
                        setEditProduct(product);
                      }}
                    >
                      <img src={editIcon} alt="" className="w-5 h-5" />
                    </button>
                    <button
                      className="btn bg-red-500 hover:bg-red-600 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteProduct(true);
                        setToDelete(product);
                      }}
                    >
                      <img src={deleteIcon} className="w-5 h-5" alt="" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <Loader />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductProfile;
