const Joi = require("joi");

const createCustomerValidator = Joi.object({
  name: Joi.string().required().min(3),
  address: Joi.string().required().min(5),
  contact: Joi.number(),
  email: Joi.string().email(),
  instagram: Joi.string(),
  company: Joi.array().allow(""),
});

const obj = { createCustomerValidator };
module.exports = obj;
