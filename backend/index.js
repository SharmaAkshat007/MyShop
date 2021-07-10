const express = require("express");
const cors = require("cors");
require("dotenv").config();
const verify = require("./middlewares/verifyToken");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));

app.use("/products", verify, require("./routes/products"));

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
