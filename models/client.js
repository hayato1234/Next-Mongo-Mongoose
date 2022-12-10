// import { Schema, model } from "mongoose";
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
});

// module.exports = mongoose.model("Client", clientSchema);
module.exports =
  mongoose.models.Client || mongoose.model("Client", clientSchema);

// export default model("Client", clientSchema);
