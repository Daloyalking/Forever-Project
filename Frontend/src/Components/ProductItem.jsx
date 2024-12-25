import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const ProductItem = ({ name, price, image, id }) => {
  const { currency } = useContext(ShopContext);
  return (
    <div>
      <Link className="hover:scale-110 overflow-hidden" to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img src={image[0]} alt="" className="hover:scale-110" />
        </div>
        <p className="mt-4 text-sm text-gray-600">{name}</p>
        <p className="text-[14px] text-gray-900">
          {currency}
          {price}
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;
