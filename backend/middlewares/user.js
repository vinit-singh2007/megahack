const { getUser } = require("../service/user");

async function checkGetUserUid(req, res, next) {
  const userId = req.cookies?.uid;
  if (!userId) return res.status(401).json({ success: false, error: "No token" });

  const user = getUser(userId);
  if (!user) return res.status(403).json({ success: false, error: "Invalid or expired token" });

  req.user = user;
  next(); 
}

async function redirectIfLoggedIn(req, res, next) {
  const userId = req.cookies?.uid;
  if (userId) return res.status(400).json({ success: false, error: "Already logged in" });
  return next();
}

module.exports = { checkGetUserUid, redirectIfLoggedIn };