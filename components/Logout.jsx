import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
    const logoutHandler = () =>{
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        useNavigate("/")
    }

  return (
      <button onClick={logoutHandler} className="bg-emerald-400 p-2 rounded-2xl cursor-pointer text-gray-700 font-semibold">
        Logout
      </button>
  );
};

export default LogoutBtn;
