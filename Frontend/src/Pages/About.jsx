import React from "react";
import Title from "../Components/Title";
import about_image from "../assets/frontend_assets/about_img.png";

const About = () => {
  return (
    <div className="mx-[5%] md:mx-[10%] mt-[40px] md:mt-[80px]">
      <div className="">
        <Title text1="About" text2="Us" />
        <div className="flex flex-col md:flex-row items-center gap-10 mt-10">
          <div className="w-full md:w-[45%]">
            <img className="w-full" src={about_image} alt="" />
          </div>
          <div className="flex-1 flex flex-col gap-4 text-gray-500">
            <p className="">
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>
            <p className="">
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
            <h2 className="text-black font-[500]">Our Mission</h2>
            <p className="">
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
