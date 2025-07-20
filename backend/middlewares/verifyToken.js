const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("🔐 In verifyToken middleware");
  const token = req.header("Authorization");
  console.log("🧾 Token received:", token);
  if (!token) {
    console.log("❌ No token, rejecting");
    return res.status(403).json({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    console.log("✅ Token verified:", decoded);
    next();
  } catch (err) {
    console.log("❌ Token invalid:", err.message);
    return res.status(403).json({ error: "Invalid token" });
  }
};


module.exports = verifyToken;
