import React from "react";
import contact_image from "../assets/frontend_assets/contact_img.png";
import Title from "../Components/Title";

const Contact = () => {
  return (
    <div className="mx-[5%] md:mx-[10%] mt-[40px] md:mt-[80px]">
      <div className="">
        <Title text1="About" text2="Us" />
        <div className="flex flex-col md:flex-row items-center gap-10 mt-10">
          <div className="w-full md:w-[45%]">
            <img className="w-full" src={contact_image} alt="" />
          </div>
          <div className="flex-1 flex flex-col items-start gap-6 text-gray-500">
            <h2 className="font-[500] text-black text-[1rem] md:text-[1.2rem]">
              Our Store
            </h2>
            <p className="w-[50%]">
              15, Fenway Street, Onikolobo, Abeokuta, Ogun State. Nigeria
            </p>
            <div className="">
              <p>Tel: +2348103573852</p>
              <p>Email: yusufridwanayomide@gmail.com</p>
            </div>
            <h2 className="font-[500] text-black text-[1rem] md:text-[1.2rem]">
              Career at Forever
            </h2>
            <p>Learn more about our teams and job openings.</p>
            <button className="px-6 py-4 border-[1px] border-black text-black hover:bg-black hover:text-white">Explore Jobs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
