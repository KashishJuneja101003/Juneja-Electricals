import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://juneja-electricals-backend.onrender.com/login",
        formData
      );

      const { token, role } = res.data;

      // Store token and role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Login Successful!");

      // Role-based redirection
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err.response?.data?.message);
      alert("Login Failed!");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-start border-1 rounded-4xl w-[30%] p-5 gap-2 bg-blue-100"
      >
        {/* Email */}
        <div className="w-full">
          <label className="font-semibold">Enter your email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Enter your email"
            className="border border-black-300 w-full p-2 rounded-md"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="font-semibold">Enter password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Enter password"
            className="border border-black-300 w-full p-2 rounded-md"
            required
          />
        </div>

        <div className="flex justify-center gap-3 w-full mt-4">
          <button
            type="submit"
            className="bg-emerald-500 p-2 rounded-2xl cursor-pointer font-semibold"
          >
            Login
          </button>
          <Link to="/Register">
            <button
              type="button"
              className="bg-emerald-500 p-2 rounded-2xl cursor-pointer font-bold"
            >
              Register
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
