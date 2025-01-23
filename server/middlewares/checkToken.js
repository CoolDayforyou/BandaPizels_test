const checkToken = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized user",
    });
  }

  const token = authToken.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }

  next();
};

module.exports = checkToken;
