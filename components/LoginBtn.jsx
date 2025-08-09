import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutBtn from './Logout'

const LoginBtn = () => {
  return (
    <Link to="/login">
      <button className="bg-emerald-400 hover:bg-emerald-600 hover:text-white transition-all ease-in-out duration-300 active:scale-95 p-2 rounded-2xl cursor-pointer text-gray-700 font-semibold">
        Login
      </button>
    </Link>
  );
};

export default LoginBtn;
