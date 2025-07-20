import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutBtn from './Logout'

const LoginBtn = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  return userName ? (
    <div className="flex gap-3 text-blue-800 font-semibold px-4 py-2">
      Hi, {userName.split(" ")[0]} 👋
      <LogoutBtn/>
    </div>
  ) : (
    <Link to="/login">
      <button className="bg-emerald-400 p-2 rounded-2xl cursor-pointer text-gray-700 font-semibold">
        Login
      </button>
    </Link>
  );
};

export default LoginBtn;
