import React from "react";

const Newsletter = () => {
  return (
    <div className="mx-[5%] md:mx-[10%] mt-[40px] md:mt-[100px]">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-[1.5rem] font-semibold">
          Subscribe now & get 20% off
        </h2>
        <p className="w-[70%] text-center text-slate-500 text-[13px] md:text-[16px]">
          Subscribe to our VIP package to enjoy exclusive access to our product
          and also discount on an item you purchase
        </p>
        <form
          action=""
          className="w-[70%] border-[1px] flex items-center justify-center "
        >
          <input
            className="w-[70%] py-3  px-4"
            type="text"
            placeholder="Enter your email"
          />
          <button className="w-[30%] py-3 bg-black text-white " type="submit">
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
