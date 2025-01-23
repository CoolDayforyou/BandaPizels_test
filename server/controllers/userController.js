const client = require("../config/api");

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { data } = await client.post("/auth/login", {
      username,
      password,
    });

    return res.status(200).json({ success: true, token: data.token });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.response?.data || "Something went wrong...",
    });
  }
};

module.exports = { loginController };
