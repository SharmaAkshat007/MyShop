const joi = require("joi");

const productValidation = (product) => {
  const productValidationSchema = joi.object({
    title: joi.string().max(100).required(),
    description: joi.string().required(),
    quantity: joi.number().positive().precision(0).required(),
    price: joi.number().positive().precision(2).required(),
  });

  return productValidationSchema.validate(product, { convert: false });
};

const updateValidation = (data) => {
  const updateValidationSchema = joi.object({
    quantity: joi.number().positive().precision(0).required(),
    price: joi.number().positive().precision(2).required(),
  });

  return updateValidationSchema.validate(data, { convert: false });
};

module.exports.productValidation = productValidation;
module.exports.updateValidation = updateValidation;
