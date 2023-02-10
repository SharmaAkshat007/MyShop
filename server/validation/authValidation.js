const joi = require("joi");

const signUpValidation = (data) => {
  const signUpValidationSchema = joi.object({
    firstName: joi.string().max(100).required(),
    lastName: joi.string().max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });
  return signUpValidationSchema.validate(data);
};

const loginValidation = (data) => {
  const loginValidationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });
  return loginValidationSchema.validate(data);
};

module.exports = {signUpValidation, loginValidation};
