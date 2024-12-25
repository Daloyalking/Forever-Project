import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/adminContext";

const List = () => {
  const { backendUrl, token } = useContext(AdminContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removedProduct, setRemovedProduct] = useState(false);

  const displayProduct = async () => {
    setLoading(true);
    try {
      const result = await axios.get(backendUrl + "/api/product/allproducts");

      if (result.data.success) {
        setList(result.data.products);
      } else {
        console.log("Error loading the product");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/deleteproduct",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        // Optimistically update the UI
        setList((prevList) => prevList.filter((item) => item._id !== id));
        // Toggle removedProduct to trigger re-fetch if needed
        setRemovedProduct((prev) => !prev);
      } else {
        console.error("Failed to delete product.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    displayProduct();
  }, [removedProduct]);

  return (
    <div className="mx-[5%] mt-[5%]">
      {loading ? (
        <p className=" text-red-500 text-center text-[2rem]">
          Loading Products...
        </p>
      ) : (
        <div className="">
          <div className="hidden md:grid grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr] items-center bg-gray-300/80">
           <p>S/n</p>
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Action</p>
          </div>
          <div className="">
            {list !== undefined &&
              list.map((item, index) => (
                <div
                  className="grid grid-cols-[1fr_1fr_3fr_1fr] md:grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 border text-sm"
                  key={index}
                >
                <p>{index+1}</p>
                  <img
                    className="w-[40px] md:w-[80px]"
                    src={item?.image[0]}
                    alt=""
                  />
                  <p>{item?.name}</p>
                  <p>{item?.category}</p>
                  <p className="col-start-3 md:col-start-auto">{item?.price}</p>
                  <p
                    onClick={() => removeProduct(item._id)}
                    className=" cursor-pointer col-start-4 md:col-start-auto text-[1.2rem]"
                  >
                    X
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
