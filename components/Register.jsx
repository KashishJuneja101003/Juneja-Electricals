import React from "react";

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

        <button
          type="submit"
          className="bg-blue-500 self-center text-white p-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
