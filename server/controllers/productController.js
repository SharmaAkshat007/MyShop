const db = require("../models/index");
const {
  productValidation,
  updateValidation,
} = require("../validation/productValidation");
const Product = db["Product"];
const User = db["User"];

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: User,
    });

    const result = products.map((product) => {
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        firstName: product.User.firstName,
        lastName: product.User.lastName,
        email: product.User.email,
      };
    });

    res.status(200).json({
      error: false,
      message: "All products fetched successfully",
      products: result,
      user: req.user,
    });
  } catch (err) {
    return next(err);
  }
};

const getMyListing = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        userId: req.user.id,
      },
    });

    const result = products.map((product) => {
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
      };
    });

    res.status(200).json({
      error: false,
      message: "Products fetched successfully",
      products: result,
      user: req.user,
    });
  } catch (err) {
    return next(err);
  }
};

const createProduct = async (req, res, next) => {
  const response = productValidation(req.body);

  if (response.error) {
    const messages = response.error.details.map((detail) => detail.message);
    return res.status(400).json({
      error: true,
      message: messages[0],
      user: req.user,
    });
  }

  const { title, description, price, quantity } = req.body;

  Product.create({
    userId: req.user.id,
    title: title,
    description: description,
    price: price,
    quantity: quantity,
  })
    .then((product) => {
      return res.status(201).json({
        error: false,
        message: "Product created successfully!",
        user: req.user,
      });
    })
    .catch((err) => {
      return next(err);
    });
};

const updateProduct = async (req, res, next) => {
  const response = updateValidation(req.body);

  if (response.error) {
    const messages = response.error.details.map((detail) => detail.message);
    return res.status(400).json({
      error: true,
      message: messages[0],
      user: req.user,
    });
  }

  const { price, quantity } = req.body;

  const productId = req.params.id;

  try {
    const product = await Product.findAll({
      where: {
        id: productId,
        userId: req.user.id,
      },
    });

    if (product.length === 0) {
      return res.status(406).json({
        error: true,
        message: `Product having id ${productId} does not exists`,
        user: req.user,
      });
    }

    Product.update(
      { price: price, quantity: quantity },
      {
        where: {
          id: productId,
          userId: req.user.id,
        },
      }
    )
      .then(() => {
        return res.status(200).json({
          error: false,
          message: `Product with id ${productId} updated successfully!`,
          user: req.user,
        });
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findAll({
      where: {
        id: productId,
        userId: req.user.id,
      },
    });

    if (product.length === 0) {
      return res.status(406).json({
        error: true,
        message: `Product having id ${productId} does not exists or you do not have permission to delete this resource`,
        user: req.user,
      });
    }

    Product.destroy({
      where: {
        id: productId,
        userId: req.user.id,
      },
    })
      .then(() => {
        return res.status(200).json({
          error: false,
          message: `Product with id ${productId} deleted successfully!`,
          user: req.user,
        });
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllProducts,
  getMyListing,
  createProduct,
  updateProduct,
  deleteProduct,
};
