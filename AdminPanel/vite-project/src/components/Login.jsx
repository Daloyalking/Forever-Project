import React, { useContext } from "react";
import { AdminContext } from "../context/adminContext";
import axios from "axios";

const Login = () => {
  const { email, setEmail, password, setPassword, backendUrl, setToken } =
    useContext(AdminContext);

  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();

      const result = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      console.log(result);

      if (result.data.success) {
        setToken(result.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full md:w-[30%] shadow-lg px-10 py-8">
        <h2 className=" font-extrabold text-[1.5rem] mb-2">Admin Panel</h2>
        <form onSubmit={onSubmitForm} action="">
          <div className="flex flex-col gap-1 mb-2">
            <label className=" font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              className="border-[2px] outline-none w-full p-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id=""
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className=" font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="border-[2px] outline-none w-full p-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id=""
            />
          </div>
          <button className="w-full bg-black text-white rounded-md p-2 mt-5">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
