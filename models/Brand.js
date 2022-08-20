const mongoose = require("mongoose");
const BrandSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String },
    categories: { type: Array, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Brand", BrandSchema);
