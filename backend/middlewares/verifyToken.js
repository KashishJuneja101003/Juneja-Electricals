const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🛡️ Auth header received:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Token missing or invalid format");
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("✅ Token verified:", decoded);
    next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
