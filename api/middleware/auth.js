const jwt = require("jsonwebtoken");

// Authentication middleware
const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Check if token starts with 'Bearer '
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Invalid token format.",
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user ID to request object
    req.userId = decoded.userId;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Access denied. Invalid token.",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token expired.",
      });
    } else {
      console.error("Auth middleware error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

module.exports = authMiddleware;
