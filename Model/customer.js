const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      index: true, //can index on this
    },
    email: {
      type: String,
      index: true, //can index on this
    },
    instagram: {
      type: String,
      index: true, //can index on this
    },
    address: {
      type: String,
      required: true,
    },
    company: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const customer = mongoose.model("customer", CustomerSchema);
module.exports = customer;
