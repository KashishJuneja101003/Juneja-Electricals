import React, { useState } from "react";
import LoginBtn from "./LoginBtn";
import axios from "axios";
import Register from "./Register";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("", formData);
      alert("Registered Successfully!");
    } catch (err) {
      // console.log(err.response?.data?.message);
      alert("Registered Failed!");
    }
  };
  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start
    items-start border-1 rounded-4xl w-[30%] p-5 gap-2 bg-blue-100"
      >
        {/* Email */}
        <div>
          <label className="font-semibold" onChange={handleChange}>
            Enter your email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="border border-black-300 w-full p-2 rounded-md"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="font-semibold" onChange={handleChange}>
            Enter password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="border border-black-300 w-full p-2 rounded-md"
            required
          />
        </div>

        <div className="flex justify-center gap-3  w-full">
          <button className="bg-emerald-500 p-2 rounded-2xl cursor-pointer font-semibold">
            Login
          </button>
          <Link to="/Register">
            <button className="bg-emerald-500 p-2 rounded-2xl cursor-pointer font-bold">
            Register
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
