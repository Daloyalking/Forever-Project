import React from "react";

const Title = ({ text1, text2, justify, size }) => {
  return (
    <div className=" text-center">
      <div
        className={`flex items-center gap-2 ${
          justify ? justify : "justify-center"
        } text-[1rem] ${size ? size : "md:text-2xl"}  `}
      >
        <p className=" text-gray-700/50 uppercase">
          {text1} <span className=" text-gray-900/80 font-medium">{text2}</span>
        </p>
        <p className="w-[50px] h-[2px] bg-gray-900 uppercase"></p>
      </div>
    </div>
  );
};

export default Title;
