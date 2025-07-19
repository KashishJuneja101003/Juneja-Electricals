const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // user object { _id, email, ... }
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

module.exports = verifyToken;
