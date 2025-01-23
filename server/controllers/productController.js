const client = require("../config/api");

const getAllProductsController = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    const { data } = await client.get("/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.status(200).json({
      success: true,
      products: data,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.response?.data || "Something went wrong...",
    });
  }
};

const getSingleProductsController = async (req, res) => {
  const { productId } = req.params;

  try {
    const token = req.headers["authorization"].split(" ")[1];

    const { data } = await client.get(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.status(200).json({
      success: true,
      product: data,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.response?.data || "Something went wrong...",
    });
  }
};

module.exports = { getAllProductsController, getSingleProductsController };
