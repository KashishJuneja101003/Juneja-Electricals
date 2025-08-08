import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; 

const LogoutBtn = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const logoutHandler = () => {
    logout(); // ✅ clears state + localStorage
    navigate("/"); // ✅ redirects
  };

  return (
    <button
      onClick={logoutHandler}
      className="bg-emerald-400 active:scale-95 p-2 rounded-2xl cursor-pointer text-gray-700 font-semibold"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
