const mongoose = require("mongoose");

const twinSchema = new mongoose.Schema({
  vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  is_honeypot: { type: Boolean, default: true },
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Twin", twinSchema);
