const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/products");
require("dotenv").config();

const verify = require("./middlewares/verifyToken");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/products", verify, productsRoute);

app.get("/user", verify, (req, res) => {
  res.status(200).json({
    error: false,
    message: "User decoded successfully",
    user: req.user,
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err.status || 500).json({
    error: true,
    message: "Some error occurred during processing!",
  });
});

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
