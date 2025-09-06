const { url } = require('inspector');
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
  images_url: { 
    type: String, 
    default: "C:\\Users\\Yugandhar Paulbudhe\\Desktop\\Overclocked_EcoFinds\\public\\images\\no_upload.jpeg",
    set: function(v) {
      return v === "" 
        ? "C:\\Users\\Yugandhar Paulbudhe\\Desktop\\Overclocked_EcoFinds\\public\\images\\no_upload.jpeg" 
        : v;
    }
  },
  description: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  condition: String,
  year_of_manufacture: Number,
  brand: String,
  model: String,
  dimensions: DimensionsSchema,
  weight: Number,
  material: String,
  color: String,
  original_packaging: { type: Boolean, default: false },
  manual_included: { type: Boolean, default: false },
  working_condition: String
});

module.exports = mongoose.model('Product', ProductSchema);