const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const expenseSchema = new mongoose.Schema({
  merchant: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  report: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = new mongoose.model('expense', expenseSchema);
