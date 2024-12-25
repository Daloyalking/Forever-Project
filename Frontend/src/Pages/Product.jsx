import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import { Link } from "react-scroll";
import star_icon from "../assets/frontend_assets/star_icon.png";
import star_dull_icon from "../assets/frontend_assets/star_dull_icon.png";
import RelatedProduct from "../Components/RelatedProduct";
import Title from "../Components/Title";

const Product = () => {
  const { products, currency, size, setSize, addToCart } =
    useContext(ShopContext);
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState();

  const fetchProduct = () => {
    let productCopy = products.slice();
    productCopy = products.find((item) => item?._id === productId);
    setProduct(productCopy);
    setMainImage(Array.isArray(productCopy?.image) && productCopy.image[0]);
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return (
    <div id="pro" className="mx-[5%] md:mx-[10%] mt-10 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8 md:gap-14">
        <div className="md:w-[50%] flex flex-col md:flex-row gap-4">
          <div className="w-[24%] md:w-[18.6%] order-2 md:order-1  flex flex-row md:flex-col gap-2">
            {Array.isArray(product?.image) &&
              product.image.map((item, index) => (
                <img
                  onClick={() => setMainImage(item)}
                  key={index}
                  className="cursor-pointer"
                  src={item}
                  alt=""
                />
              ))}
          </div>

          <div className="flex-1 w-full order-1 md:order-2">
            <img className="w-full" src={mainImage} alt="" />
          </div>
        </div>
        <div className="flex-1 mt-2">
          <p className=" capitalize text-[1.6rem] font-medium">
            {product?.name}
          </p>
          <div className="mt-4 flex items-center gap-3 text-[1.1rem]">
            <div className="flex items-center gap-1">
              <img src={star_icon} alt="" className="w-4" />
              <img src={star_icon} alt="" className="w-4" />
              <img src={star_icon} alt="" className="w-4" />
              <img src={star_icon} alt="" className="w-4" />
              <img src={star_dull_icon} alt="" className="w-4" />
            </div>
            <p>(122)</p>
          </div>
          <p className="mt-4 text-[1.5rem] font-semibold">
            {currency}
            {product?.price}
          </p>
          <p className="mt-4 w-[85%] text-slate-500/90 text-[1.1rem]">
            {product?.description}
          </p>
          <div className="mt-7">
            <p className="text-[1.2rem] mb-4">Select Size</p>
            <div className="flex items-center gap-3 overflow-hidden">
              {product?.size.map((item, index) => {
                return (
                  <p
                    key={index}
                    onClick={() => setSize(item)}
                    className={`cursor-pointer bg-gray-200/60 py-2 px-4 w-fit text-[1.2rem] ${
                      item === size ? "border-orange-500 border-[2px]" : ""
                    } `}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
          <p
            onClick={() => addToCart(product?._id, size)}
            className="uppercase bg-black text-white py-3 px-6 w-fit mt-8"
          >
            Add to Cart
          </p>
          <hr className="mt-10" />
          <div className="mt-5">
            <p className="text-gray-500 pb-[1.5px]">100% Original product.</p>
            <p className="text-gray-500 pb-[1.5px]">
              Cash on delivery is available on this product.
            </p>
            <p className="text-gray-500 pb-[1.5px]">
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex items-center border w-fit">
          <p className="p-4 border-r font-semibold">Description</p>
          <p className="p-4">Reviews (122)</p>
        </div>
        <div className="border p-6 leading-6 text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p className="mt-5">
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      <div className="mt-20">
        <Title text1="RELATED" text2="PRODUCTS" />

        <Link to="pro" smooth={true} duration={500} offset={-500}>
          <RelatedProduct
            category={product?.category}
            subCategory={product?.subCategory}
          />
        </Link>
      </div>
    </div>
  );
};

export default Product;
