require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log(process.env.JWT_SECRET);
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token expired. Please log in again." });
    }
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
