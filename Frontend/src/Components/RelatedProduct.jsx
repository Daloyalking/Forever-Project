import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "./ProductItem";
import { NavLink } from "react-router-dom";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category);

      productCopy = productCopy.filter(
        (product) => subCategory === product.subCategory
      );
      setRelated(productCopy);
    }
  }, [category, subCategory]);

  return (
    <div className="mt-9 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {related.slice(0, 5).map((item, index) => (
        <ProductItem
          key={index}
          name={item.name}
          price={item.price}
          image={item.image}
          id={item._id}
        />
      ))}
    </div>
  );
};

export default RelatedProduct;
