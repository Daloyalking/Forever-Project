import React, { useContext, useEffect, useState } from "react";
import FilterCollection from "../Components/FilterCollection";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "../Components/ProductItem";

const Collection = () => {
  const { products, categories, subCategories, openSearch, searchText } =
    useContext(ShopContext);
  const [allProducts, setAllProducts] = useState([]);
  const [sortBy, setSortBy] = useState("relevant");

  // Filter Section

  const filterProduct = () => {
    let productCopy = products.slice();

    if (openSearch && searchText) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
   

    if (categories.length > 0) {
      productCopy = productCopy.filter((item) =>
        categories.includes(item.category)
      );
    }

    if (subCategories.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategories.includes(item.subCategory)
      );
    }
    setAllProducts(productCopy);
  };

  // Sorting Section

  const sortByFunction = () => {
    let productCopy = allProducts.slice();

    switch (sortBy) {
      case "lowtohigh":
        productCopy = productCopy.sort((a, b) => a.price - b.price);
        setAllProducts(productCopy);
        break;
      case "hightolow":
        productCopy = productCopy.sort((a, b) => b.price - a.price);
        setAllProducts(productCopy);
        break;
      default:
        filterProduct();
        break;
    }
  };

  useEffect(() => {
    filterProduct();
  }, [categories, subCategories, searchText, openSearch,products]);

  useEffect(() => {
    sortByFunction();
  }, [sortBy]);

  return (
    <div className="mx-[5%] md:mx-[10%]">
      <div className="flex mt-12 flex-col md:flex-row gap-4">
        <FilterCollection />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="text-[2px]">
              <Title className="m-0 p-0" text1="ALL" text2="COLLECTION" />
            </div>

            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="p-3 border-[2px] text-[12px] md:text-[14px]"
              name=""
              id=""
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="lowtohigh">Sort by: Low to High</option>
              <option value="hightolow">Sort by: High to Low</option>
            </select>
          </div>

          {/* Displaying Product Section */}
          <div className="mt-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allProducts.map((item, index) => {
              return (
                <ProductItem
                  key={index}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  id={item._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
