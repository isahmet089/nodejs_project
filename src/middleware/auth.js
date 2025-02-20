const jwt = require("jsonwebtoken");
const { accessToken, refreshToken } = require("../config/jwtConfig");
const RefreshToken = require("../models/RefreshToken.js");

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, accessToken.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};

const verifyRefreshToken = (req, res, next) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    return res.status(403).json({ message: "Refresh token required" });
  }

  try {
    const storedToken = RefreshToken.findToken(token);
    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const decoded = jwt.verify(token, refreshToken.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };