const mongoose = require('mongoose');

const DimensionsSchema = new mongoose.Schema({
  length: Number,
  width: Number,
  height: Number,
  diameter: Number,
  waist: Number,
  inseam: Number
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  images: { 
    type: [String], 
    default: ["/images/no_upload.jpeg"],
    set: function(images) {
      if (!images || !Array.isArray(images) || images.length === 0) {
        return ["/images/no_upload.jpeg"];
      }
      return images.map(image => image === "/images/no_upload.jpeg" ? "/images/no_upload.jpeg" : image);
    }
  },
  description: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  // Allow any string here since your data has "Refurbished" with capital R
  condition: { type: String, default: "Used" }, 
  year_of_manufacture: Number,
  brand: String,
  model: String,
  dimensions: DimensionsSchema,
  weight: Number,
  material: String,
  color: String,
  original_packaging: { type: Boolean, default: false },
  manual_included: { type: Boolean, default: false },
  // Allow any string for working_condition
  working_condition: { type: String, default: "working" },  
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
