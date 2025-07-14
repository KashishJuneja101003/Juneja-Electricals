import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://juneja-electricals-backend.onrender.com/register", formData);
      alert("Registered Successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data?.message);
      alert("Registration Failed!");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-start border-1 rounded-4xl w-[30%] p-5 gap-4 bg-blue-100"
      >
        {/* Name */}
        <div className="w-full">
          <label className="font-semibold">Enter your name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="border border-black-300 w-full p-2 rounded-md"
            required
          />
        </div>

        {/* Email */}
        <div className="w-full">
          <label className="font-semibold">Enter your email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="border border-black-300 w-full p-2 rounded-md"
            required
          />
        </div>

        {/* Role Dropdown (Optional for testing) */}
        <div className="w-full">
          <label className="font-semibold">Select Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-black-300 w-full p-2 rounded-md"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="w-full flex justify-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-emerald-500 p-2 rounded-2xl cursor-pointer font-bold"
          >
            Register
          </button>

          <Link to="/login">
            <button
              type="button"
              className="bg-emerald-500 p-2 rounded-2xl cursor-pointer font-bold"
            >
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
