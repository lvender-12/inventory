const mongoose = require('../config/db');
const categories = require('./categoriesModel')

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'wajib diisi'],
    },
    stock: {
        type: Number,
        required: [true, 'wajib diisi'],
    },
    price: {
        type: Number,
        required: [true, 'wajib diisi'],
    },
    categories_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    deskripsi: {
        type: String,
        required: false
    },
    added_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('products', productsSchema)