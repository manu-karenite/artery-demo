const { createCustomerValidator } = require("../Middleware/customer.js");
const company = require("../Model/customer.js");
const createCustomer = async (req, res) => {
  try {
    const { error, value } = await createCustomerValidator.validateAsync(
      req.body
    );
    const { email, contact, instagram } = req.body;
    if ((email || contact || instagram) == undefined) {
      return res.status(401).json("Contact, email or instagram missing");
    }
    //ALL CHECKS VERIFIED..

    //check whether the same keys exists in database:
    let checkExists = null;
    if (req.body?.email) {
      checkExists = await company.findOne({
        email: req.body?.email,
      });
      if (checkExists) {
        throw "User Already Exists with us! Please Try with Another Email";
      }
    }
    if (req.body?.contact) {
      checkExists = await company.findOne({
        contact: req.body?.contact,
      });
      if (checkExists) {
        throw "User Already Exists with us! Please Try with Another Contact";
      }
    }
    if (req.body?.instagram) {
      checkExists = await company.findOne({
        instagram: req.body?.instagram,
      });
      if (checkExists) {
        throw "User Already Exists with us! Please Try with Another Instagram Handle";
      }
    }

    // INSERT INTO DATABASE

    const query = new company(req.body);
    const result = await query.save();

    res.status(201).json("Created");
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

const getAllCustomers = async (req, res) => {
  const allCustomers = await company.find({});
  res.status(200).json({ total: allCustomers.length, allCustomers });
};

const getCustomer = async (req, res) => {
  const { email, contact, instagram } = req.query;
  //checking just one condition as per assessment point 2
  try {
    if (email == undefined && contact == undefined && instagram == undefined) {
      throw "Pass email or contact or instagram parameter to search";
    }
    let result = null;
    if (email) {
      result = await company.findOne({ email: email });
    } else if (contact) {
      result = await company.findOne({ contact: contact });
    } else if (instagram) {
      result = await company.findOne({ instagram: instagram });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error);
  }
};

const getCustomerByCompanies = async (req, res) => {
  console.log(req.query);
  try {
    const result = await company.find({
      company: { $in: req.query?.company },
    });
    res.status(200).json({ total: result.length, result });
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

const editCustomer = async (req, res) => {
  try {
    const { email, contact, instagram } = req.body;
    if ((email || contact || instagram) == undefined) {
      return res.status(401).json("Contact, email or instagram missing");
    }
    //check whether a document exists with this or not...
    let checkExists = null;
    if (req.body?.email) {
      checkExists = await company.findOne({
        email: req.body?.email,
      });
    }
    if (req.body?.contact) {
      checkExists = await company.findOne({
        contact: req.body?.contact,
      });
    }
    if (req.body?.instagram) {
      checkExists = await company.findOne({
        instagram: req.body?.instagram,
      });
    }
    if (checkExists === null) {
      throw "No User Found";
    }

    //we can have an update request...this
    const result = await company.findByIdAndUpdate(checkExists?._id, req.body, {
      new: true,
    });
    console.log(result);
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error });
  }
};

const obj = {
  createCustomer,
  getAllCustomers,
  getCustomer,
  getCustomerByCompanies,
  editCustomer,
};
module.exports = obj;
