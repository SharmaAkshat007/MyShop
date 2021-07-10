const express = require("express");

const router = express.Router();

router.get("", (req, res) => {
  return res.status(200).json({
    error: false,
    message: "sab chnga si",
    user: req.user,
  });
});

module.exports = router;
