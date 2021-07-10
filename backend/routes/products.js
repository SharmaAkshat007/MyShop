const express = require("express");
const db = require("../models/index");

const router = express.Router();

const productValidation = require("../validation/productValidation");

const Product = db["Product"];

router.get("", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      return res.status(200).json({
        error: false,
        message: "All products fecthed successfully",
        products: products,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

router.post("/create", async (req, res, next) => {
  const response = productValidation(req.body);

  if (response.error) {
    const messages = response.error.details.map((detail) => detail.message);
    return res.status(400).json({
      error: true,
      message: messages[0],
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
      });
    })
    .catch((err) => {
      return next(err);
    });
});

router.delete("/delete/:id", async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findAll({
      where: {
        id: productId,
      },
    });

    if (product.length === 0) {
      return res.status(406).json({
        error: true,
        message: `Product having id ${productId} does not exists`,
      });
    }

    Product.destroy({
      where: {
        id: productId,
      },
    })
      .then(() => {
        return res.status(200).json({
          error: false,
          message: `Product with id ${productId} deleted successfully!`,
        });
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
