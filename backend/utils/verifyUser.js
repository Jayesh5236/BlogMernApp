import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  try {
    const privateKey = process.env.JWT_SECRET;

    // Fetch the token from headers
    const token = req.headers["auth-token"];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify the token
    jwt.verify(token, privateKey, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: "Token expired" });
        }
        return res.status(401).json({ error: "Unauthorized" });
      }
      req.user = user;
      return next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export default authMiddleware;
