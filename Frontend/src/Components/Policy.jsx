import React from "react";
import exchange_icon from "../assets/frontend_assets/exchange_icon.png";
import quality_icon from "../assets/frontend_assets/quality_icon.png";
import support_icon from "../assets/frontend_assets/support_img.png";

const Policy = () => {
  return (
    <div className="mx-[5%] md:mx-[10%] mt-[40px] md:mt-[100px]">
      <div className="w-full flex flex-col md:flex-row items-center gap-8 justify-center">
        <div className="w-1/2">
          <img src={exchange_icon} className="m-auto" alt="" />
          <div className="flex flex-col items-center mt-5">
            <p className=" font-semibold">Easy Exchange Policy</p>
            <p className=" text-slate-400">
              We offer hassle free exchange policy
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <img src={quality_icon} className="m-auto" alt="" />
          <div className="flex flex-col items-center mt-5">
            <p className=" font-semibold">7 Days Return Policy</p>
            <p className=" text-slate-400">
              We provide 7 days free return policy
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <img src={support_icon} className="m-auto" alt="" />
          <div className="flex flex-col items-center mt-5">
            <p className=" font-semibold">Best customer support</p>
            <p className=" text-slate-400">We provide 24/7 customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
