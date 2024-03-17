const jwt = require("jsonwebtoken");
//Sign the jwt token
exports.signToken = ({ id }) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};
