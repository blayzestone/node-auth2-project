const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/constants");

module.exports = function (req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.local = decodedToken;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "Missing credentials to access this resource" });
  }
};
