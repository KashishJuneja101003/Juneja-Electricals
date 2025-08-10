import { Navigate } from "react-router-dom";

function AdminRoute({ children, user }) {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User Check:", user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") {
    alert("Sorry, only admin can visit the dashboard!");
    return <Navigate to="/" replace />;
  }
  return children;
}

export default AdminRoute;
