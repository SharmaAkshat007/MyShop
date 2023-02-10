const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const {
  signUpValidation,
  loginValidation,
} = require("../validation/authValidation");

const User = db["User"];

const signup = async (req, res, next) => {
  const response = signUpValidation(req.body);

  if (response.error) {
    const messages = response.error.details.map((detail) => detail.message);
    return res.status(400).json({
      error: true,
      message: messages[0],
    });
  }
  const { firstName, lastName, email, password } = req.body;

  try {
    const result = await User.findAll({
      where: {
        email: email,
      },
    });

    if (result.length === 0) {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return next(err);
        }
        const user = User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hash,
        })
          .then((user) => {
            return res.status(201).json({
              error: false,
              message: "User created successfully!",
            });
          })
          .catch((err) => {
            return next(err);
          });
      });
    } else {
      return res.status(202).json({
        error: true,
        message: "User with similar email-id already exists",
      });
    }
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  const response = loginValidation(req.body);

  if (response.error) {
    const messages = response.error.details.map((detail) => detail.message);
    return res.status(400).json({
      error: true,
      message: messages[0],
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findAll({
      where: {
        email: email,
      },
    });

    if (user.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No user with this email-id exists",
      });
    }

    bcrypt.compare(password, user[0].password, (err, match) => {
      if (err) {
        return next(err);
      }
      if (match === true) {
        const userData = {
          id: user[0].id,
          firstName: user[0].firstName,
          lastName: user[0].lastName,
          email: user[0].email,
        };
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);

        return res.status(200).json({
          error: false,
          message: "Authentication done",
          jwtToken: accessToken,
        });
      } else {
        return res.status(406).json({
          error: true,
          message: "Password is incorrect",
        });
      }
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { signup, login };
