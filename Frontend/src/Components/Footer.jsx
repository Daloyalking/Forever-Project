import React from "react";
import logo_image from "../assets/frontend_assets/logo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mx-[5%] md:mx-[10%] mt-[40px] md:mt-[100px]">
      <div className="w-full flex flex-col md:flex-row gap-10 md:gap-4 items-start">
        <div className="md:w-[40%]">
          <img
            className="w-[100px] md:w-[180px] mb-5"
            src={logo_image}
            alt=""
          />
          <p className="text-[12px] md:text-[14px] text-slate-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className=" md:flex-1 flex flex-col md:items-center justify-start w-full">
          <h2 className="uppercase font-medium mb-5 text-[1.1rem] md:text-[1.3rem]">
            Company
          </h2>
          <ul className="flex flex-col gap-1 text-slate-500">
            <NavLink>
              <li>Home</li>
            </NavLink>
            <NavLink>
              <li>About us</li>
            </NavLink>
            <NavLink>
              <li>Delivery</li>
            </NavLink>
            <NavLink>
              <li>Private policy</li>
            </NavLink>
          </ul>
        </div>
        <div className="md:flex-1">
          <h2 className="uppercase mb-5 text-[1.1rem] font-medium md:text-[1.3rem]">
            Get in touch
          </h2>
          <div className="flex flex-col gap-1 text-slate-500">
            <p>+2348103573852</p>
            <p>yusufridwanayomide@gmail.com</p>
            <p>Facebook</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-16">
        <p className="border-t-2 p-4">Copyright 2024@ Daloyalking - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
