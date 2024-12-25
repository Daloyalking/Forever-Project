import React, { useContext, useState } from "react";
import upload from "../assets/admin_assets/upload_area.png";
import axios from "axios";
import { AdminContext } from "../context/adminContext";

const Add = () => {
  const { backendUrl, token } = useContext(AdminContext);
  const [formInfo, setFormInfo] = useState({
    name: "",
    description: "",
    category: "Men",
    subCategory: "Topwear",
    price: "",
    size: [],
    bestSeller: false,
    image1: false,
    image2: false,
    image3: false,
    image4: false,
  });
  const [loading, setLoading] = useState(false);

  const onSubmitFormData = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData();
      formData.append("name", formInfo.name);
      formData.append("description", formInfo.description);
      formData.append("category", formInfo.category);
      formData.append("subCategory", formInfo.subCategory);
      formData.append("price", formInfo.price);
      formData.append("size", JSON.stringify(formInfo.size));
      formData.append("bestSeller", formInfo.bestSeller);
      formInfo.image1 && formData.append("image1", formInfo.image1);
      formInfo.image2 && formData.append("image2", formInfo.image2);
      formInfo.image3 && formData.append("image3", formInfo.image3);
      formInfo.image4 && formData.append("image4", formInfo.image4);

      const result = await axios.post(
        backendUrl + "/api/product/addproduct",
        formData,
        {
          headers: { token },
        }
      );
      console.log(result);

      setLoading(false);
      setFormInfo({
        name: "",
        description: "",
        category: "Men",
        subCategory: "Topwear",
        price: "",
        size: [],
        bestSeller: false,
        image1: false,
        image2: false,
        image3: false,
        image4: false,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mx-[5%] mt-5">
      <div className="">
        <form onSubmit={onSubmitFormData} className="" action="">
          <div className="">
            <p className="mb-2">Upload image</p>
            <div className="flex items-center gap-2">
              <label className="w-[60px] md:w-[80px]" htmlFor="image1">
                <img
                  src={
                    formInfo.image1
                      ? URL.createObjectURL(formInfo.image1)
                      : upload
                  }
                  alt=""
                />
                <input
                  onChange={(e) =>
                    setFormInfo((prev) => ({
                      ...prev,
                      image1: e.target.files[0],
                    }))
                  }
                  type="file"
                  name=""
                  id="image1"
                  className="hidden"
                />
              </label>
              <label className="w-[60px] md:w-[80px]" htmlFor="image2">
                <img
                  src={
                    formInfo.image2
                      ? URL.createObjectURL(formInfo.image2)
                      : upload
                  }
                  alt=""
                />
                <input
                  onChange={(e) =>
                    setFormInfo((prev) => ({
                      ...prev,
                      image2: e.target.files[0],
                    }))
                  }
                  type="file"
                  name=""
                  id="image2"
                  className="hidden"
                />
              </label>
              <label className="w-[60px] md:w-[80px]" htmlFor="image3">
                <img
                  src={
                    formInfo.image3
                      ? URL.createObjectURL(formInfo.image3)
                      : upload
                  }
                  alt=""
                />
                <input
                  onChange={(e) =>
                    setFormInfo((prev) => ({
                      ...prev,
                      image3: e.target.files[0],
                    }))
                  }
                  type="file"
                  name=""
                  id="image3"
                  className="hidden"
                />
              </label>
              <label className="w-[60px] md:w-[80px]" htmlFor="image4">
                <img
                  src={
                    formInfo.image4
                      ? URL.createObjectURL(formInfo.image4)
                      : upload
                  }
                  alt=""
                />
                <input
                  onChange={(e) =>
                    setFormInfo((prev) => ({
                      ...prev,
                      image4: e.target.files[0],
                    }))
                  }
                  type="file"
                  name=""
                  id="image4"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <label htmlFor="name" className="text-[10px] md:text-[16px]">
              Product name
            </label>
            <input
              className="p-2 border-[1px] border-gray-300 w-full md:w-[50%]"
              type="text"
              placeholder="Type here"
              name="name"
              id=""
              required
              value={formInfo.name}
              onChange={(e) =>
                setFormInfo((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-[10px] md:text-[16px]" htmlFor="description">
              Product description
            </label>
            <textarea
              className="p-2 border-[1px] border-gray-300 w-full md:w-[50%]"
              name=""
              placeholder="Write content here"
              id=""
              required
              value={formInfo.description}
              onChange={(e) =>
                setFormInfo((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="category" className="text-[10px] md:text-[16px]">
                Product category
              </label>
              <select
                required
                value={formInfo.category}
                onChange={(e) =>
                  setFormInfo((prev) => ({ ...prev, category: e.target.value }))
                }
                className="p-2 border-[1px] border-gray-300 w-full text-[10px] md:text-[16px]"
                name="category"
                id=""
              >
                <option className="text-[10px] md:text-[16px]" value="Men">
                  Men
                </option>
                <option className="text-[10px] md:text-[16px]" value="Women">
                  Women
                </option>
                <option className="text-[10px] md:text-[16px]" value="Kids">
                  Kids
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label
                className="text-[10px] md:text-[16px]"
                htmlFor="subCategory"
              >
                Product subcategory
              </label>
              <select
                required
                value={formInfo.subCategoryategory}
                onChange={(e) =>
                  setFormInfo((prev) => ({
                    ...prev,
                    subCategory: e.target.value,
                  }))
                }
                name="subCategory"
                className="p-2 border-[1px] border-gray-300 w-full text-[10px] md:text-[16px]"
                id=""
              >
                <option className="text-[10px] md:text-[16px]" value="Topwear">
                  Topwear
                </option>
                <option
                  className="text-[10px] md:text-[16px]"
                  value="Bottomwear"
                >
                  Bottomwear
                </option>
                <option
                  className="text-[10px] md:text-[16px]"
                  value="Winterwear"
                >
                  Winterwear
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-[10px] md:text-[16px]" htmlFor="price">
                Product price
              </label>
              <input
                required
                value={formInfo.price}
                onChange={(e) =>
                  setFormInfo((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                className="p-2 border-[1px] border-gray-300 w-full text-[10px] md:text-[16px]"
                type="number"
                placeholder="Type here"
                name="price"
                id=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2 mb-4">
            <p className="text-[10px] md:text-[16px]">Product sizes</p>
            <div className="flex items-center gap-3">
              <p
                onClick={() =>
                  setFormInfo((prev) => ({
                    ...prev,
                    size: prev.size.includes("S")
                      ? prev.size.filter((item) => item !== "S")
                      : [...prev.size, "S"],
                  }))
                }
                className={`bg-gray-200 py-2 px-4 ${
                  formInfo.size.includes("S") ? "bg-orange-500" : ""
                }`}
              >
                S
              </p>
              <p
                onClick={() =>
                  setFormInfo((prev) => ({
                    ...prev,
                    size: prev.size.includes("M")
                      ? prev.size.filter((item) => item !== "M")
                      : [...prev.size, "M"],
                  }))
                }
                className={`bg-gray-200 py-2 px-4 ${
                  formInfo.size.includes("M") ? "bg-orange-500" : ""
                }`}
              >
                M
              </p>
              <p
                onClick={() =>
                  setFormInfo((prev) => ({
                    ...prev,
                    size: prev.size.includes("L")
                      ? prev.size.filter((item) => item !== "L")
                      : [...prev.size, "L"],
                  }))
                }
                className={`bg-gray-200 py-2 px-4 ${
                  formInfo.size.includes("L") ? "bg-orange-500" : ""
                }`}
              >
                L
              </p>
              <p
                onClick={() =>
                  setFormInfo((prev) => ({
                    ...prev,
                    size: prev.size.includes("XL")
                      ? prev.size.filter((item) => item !== "XL")
                      : [...prev.size, "XL"],
                  }))
                }
                className={`bg-gray-200 py-2 px-4 ${
                  formInfo.size.includes("XL") ? "bg-orange-500" : ""
                }`}
              >
                XL
              </p>
              <p
                onClick={() =>
                  setFormInfo((prev) => ({
                    ...prev,
                    size: prev.size.includes("XXL")
                      ? prev.size.filter((item) => item !== "XXL")
                      : [...prev.size, "XXL"],
                  }))
                }
                className={`bg-gray-200 py-2 px-4 ${
                  formInfo.size.includes("XXL") ? "bg-orange-500" : ""
                }`}
              >
                XXL
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={formInfo.bestSeller}
              onChange={(e) =>
                setFormInfo((prev) => ({
                  ...prev,
                  bestSeller: !prev.bestSeller,
                }))
              }
              type="checkbox"
              name=""
              id=""
            />
            <span className="text-[10px] md:text-[16px]">
              Add to bestseller
            </span>
          </div>
          <button className="bg-black text-[10px] md:text-[16px] py-3 px-6 md:px-10 mt-10 text-white">
            ADD
          </button>
        </form>
      </div>
      <p className="text-red-500 text-lg">{loading && "Loading"}</p>
    </div>
  );
};

export default Add;
