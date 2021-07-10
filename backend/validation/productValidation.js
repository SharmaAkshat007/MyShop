const joi = require("joi");

const productValidation = (product) => {
  const productValidationSchema = joi.object({
    title: joi.string().min(5).max(100).required(),
    description: joi.string().required(),
    quantity: joi.number().positive().precision(0).required(),
    price: joi.number().positive().precision(2).required(),
  });

  return productValidationSchema.validate(product, { convert: false });
};

module.exports = productValidation;
