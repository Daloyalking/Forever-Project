import React from "react";
import hero from '../assets/frontend_assets/hero_img.png'

const Hero = () => {
  return (
    <div>
      <div className="mx-[5%] md:mx-[10%] my-4">
        <div className="block md:flex items-center border-2">
          <div className="w-full md:w-1/2 mb-10  md:mb-2 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2">
              <p className="h-[2px] w-[50px] bg-[#414141]"></p>
              <p className="font-[400]">OUR BESTSELLERS</p>
            </div>
            <p className="prata-regular text-[3rem]">Latest Arrivals</p>
            <div className="flex items-center gap-2">
              <p className="font-[600]">SHOP NOW</p>
              <p className="h-[1.2px] w-[50px] bg-[#414141]"></p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img src={hero} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
