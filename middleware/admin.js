const jwt = require("jsonwebtoken");
require("dotenv").config();
const adminjwt = process.env.adminjwt_password;

function adminMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    const decode = jwt.verify(token, adminjwt);
    if (decode) {
      req.adminid = decode.id;
      next();
    } else {
      res.json("Invalid token");
    }
  } 
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  adminMiddleware,
};
