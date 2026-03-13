const jwt = require("jsonwebtoken");
const secret = process.env.Secret;

function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email },
    secret,
    { expiresIn: "1d" } 
  );
}

function getUser(token) {
  try {
    return jwt.verify(token, secret); // ✅ wrapped in try/catch
  } catch (error) {
    return null; 
  }
}

module.exports = { setUser, getUser };