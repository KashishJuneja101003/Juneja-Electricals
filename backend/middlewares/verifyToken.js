require("dotenv").config({path: "../.env"})
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    console.log("🛡️ [VERIFY] JWT_SECRET:", process.env.JWT_SECRET);
    const authHeader = req.headers.authorization;
    console.log("🛡️ Auth header received:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Token missing or invalid format");
      return res.status(403).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token verified:", decoded);
    req.user = decoded;
    next();

  } catch (err) {
    alert("Kindly re-login your account!")
    console.log("❌ Token verification failed:", err.message);
    res.status(403).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = verifyToken;
