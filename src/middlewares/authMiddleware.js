const jwt = require("jsonwebtoken");
const isUserAuthorized = (req, res, next) => {
  try {
    if (!req.headers.token) {
      return res.status(400).json({
        error: "sigin again",
      });
    }
    const token = req.headers.token;
    req.currentUser = jwt.verify(token, process.env.SECRET);
    console.log(req.currentUser);
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized :invalid token" });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Unauthorized : Token expired" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = isUserAuthorized;
