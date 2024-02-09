const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function for authentication
const verify = (req, res, next) => {
  // Extract the token from the request headers
  let token = req.headers["authorization"];

  if (token) {
    //  token=token.split(' ')[1];
    // Verify the token using the provided secret key from .env
    jwt.verify(token, process.env.jwtkey, function (err) {//authData
      if (err) {
        // If verification fails, send a 401 Unauthorized response
        res.status(401).send("Please provide a valid Token");
      } else {
        // If verification is successful, proceed to the next middleware
        next();
      }
    });
  } else {
    // If no token is provided in the headers, send a 403 Forbidden response
    res.status(403).send("Please add a token to the Header");
  }
};

module.exports = verify;
