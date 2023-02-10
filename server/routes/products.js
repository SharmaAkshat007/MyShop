const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getMyListing,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("", getAllProducts);

router.get("/my/listing", getMyListing);

router.post("/create", createProduct);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;
