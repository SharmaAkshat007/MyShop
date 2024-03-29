const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token === "undefined" || token === null) {
    return res.status(401).json({
      error: true,
      message: "auth token not present",
    });
  } else {
    

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return next(err);
      }
      req.user = user;
      next();
    });
  }
};

module.exports = verify;
