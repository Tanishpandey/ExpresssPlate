// menuSchema.js

const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  closingTime: {
    type: String, // You can use Date type if you want to store time as a Date object
    required: true,
  },
  menuItems: [{
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
