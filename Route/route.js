const CustomerRouter = require("express").Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomer,
  getCustomerByCompanies,
  editCustomer,
} = require("../Controller/customer.js");

//Validating Schema

CustomerRouter.route("/add-customer").post(createCustomer);
CustomerRouter.route("/get-all-customers").get(getAllCustomers);
CustomerRouter.route("/get-customer").get(getCustomer);
CustomerRouter.route("/get-customer-by-companies").get(getCustomerByCompanies);
CustomerRouter.route("/edit-customer").patch(editCustomer);
module.exports = CustomerRouter;
