const mongoose = require('../config/db');

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'wajib diisi'],
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('categories', categoriesSchema);
