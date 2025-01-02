import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";

const Login = () => {
  const {
    token,
    setToken,
    navigate,
    loginOp,
    setLoginOp,
    incorrectLogin,
    setIncorrectLogin,
    errorSign,
    setErrorSign,
    loginInfo,
    setLoginInfo,
    loginFunction,
  } = useContext(ShopContext);

  useEffect(() => {
    console.log(token);
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="mx-[5%] md:mx-[10%] mt-[40px] md:mt-[80px]">
      <div className="w-full md:w-[40%] mx-auto">
        <div className="">
          <div className="flex items-center justify-center gap-2">
            <p className="text-[1.5rem] md:text-[2rem]">
              {loginOp ? "Login" : "Sign Up"}
            </p>
            <hr className="w-[10%] h-[3px] bg-black" />
          </div>
          <form className="flex flex-col gap-4 mt-4 mb-2" action="">
            {!loginOp && (
              <input
                className="border-[1px] outline-none p-2 md:p-3 border-black"
                type="text"
                placeholder="Name"
                value={loginInfo.name}
                onChange={(e) =>
                  setLoginInfo((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            )}
            <input
              className="border-[1px] outline-none p-2 md:p-3 border-black"
              type="email"
              placeholder="Email"
              value={loginInfo.email}
              onChange={(e) =>
                setLoginInfo((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <input
              className="border-[1px] outline-none p-2 md:p-3 border-black"
              type="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={(e) =>
                setLoginInfo((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </form>
          {incorrectLogin && (
            <p className="text-red-500">Incorrect login details, check well</p>
          )}
          {errorSign.incorrectEmail && (
            <p className="text-red-500">
              The format of your email is incorrect
            </p>
          )}
          {errorSign.userExist && (
            <p className="text-red-500">User already exist</p>
          )}
          {errorSign.shortPassword && (
            <p className="text-red-500">
              Your password must be above 8 characters
            </p>
          )}
          <div className="flex items-center justify-between">
            <p className="" onClick={() => navigate("/reset")}>
              Forgot password?
              <span className="underline text-blue-400 cursor-pointer">
                {" "}
                Reset Password
              </span>
            </p>
            <p
              onClick={() => {
                setLoginOp(!loginOp);
                setErrorSign({
                  incorrectEmail: false,
                  userExist: false,
                  shortPassword: false,
                });
                setLoginInfo({ name: "", email: "", password: "" });
              }}
              className="cursor-pointer"
            >
              {loginOp ? "Create Account" : "Login Here"}
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={loginFunction}
              className="px-10 md:px-8 py-2 bg-black text-white"
            >
              {loginOp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
