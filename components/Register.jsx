import React from "react";
import {Link} from 'react-router-dom';
const Register = () => {
  const handleSubmit = () => {};
  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start
    items-start border-1 rounded-4xl w-[30%] p-5 gap-2 bg-blue-100"
      >

        {/* Name */}
        <div>
            <label className="font-semibold">Enter your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="border border-black-300 w-full p-2 rounded-md"
          required
        />
        </div>

        {/* Email */}
        <div>
            <label className="font-semibold">Enter your email:</label>
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
            <label className="font-semibold">Enter password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="border border-black-300 w-full p-2 rounded-md"
          required
        />
        </div>

        <div className="w-full justify-center flex gap-2">
          <Link to="/Register">
                    <button className="bg-emerald-500 p-2 rounded-2xl cursor-pointer font-bold">
                    Register
                  </button>
                  </Link>
        <Link to="/LoginPage">
            <button className="bg-emerald-500 p-2 rounded-2xl cursor-pointer font-bold">
            Login
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
