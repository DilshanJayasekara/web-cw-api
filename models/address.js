const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adressSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  addressLine01: {
    type: String,
    required: true,
  },
  addressLine02: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("Address", adressSchema);
module.exports = Address;
