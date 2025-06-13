const productsModel = require('../model/productsModel');
const categoriesModel = require('../model/categoriesModel');
const validator = require('validator');
const mongoose = require('../config/db')

class productsController{
    async GetAllProducts(req,res){
        const products = await productsModel.find().populate('categories_id', 'name');

        res.status(200).json(JSON.stringify(products))
    }

    async AddProduct(req,res){
        const products = await req.body;
        const err = [];
        // const existing = await categoriesModel.findOne({ _id: products.categories });

        if(validator.isEmpty(products.name || products.stock || products.price || products.categories_id)){
            err.push({field: 'form', msg : 'tidak boleh kosong selain deskripsi'});
        }

        if (!mongoose.Types.ObjectId.isValid(products.categories_id)) {
            err.push({ field: 'categories_id', msg: 'ID kategori tidak valid' });
        } else {
            // Cek apakah ID tersebut ada di koleksi
            const existing = await categoriesModel.findById(products.categories_id);
            if (!existing) {
                err.push({ field: 'categories_id', msg: 'Kategori tidak ditemukan' });
            }
            
        }

        
        if(!validator.isNumeric(products.stock || products.price)){
            err.push({field: 'stock or price', msg : 'stock dan price harus numeric'});
        }

        products.stock = Number(products.stock)
        products.price = Number(products.price)
        
        if (err.length > 0) {
            return res.status(400).json({ errors: err });
        }

        try {
            const newProduct = await productsModel.create({
                name: products.name,
                stock : products.stock,
                price : products.price,
                categories_id: products.categories_id,
                deskripsi: products.deskripsi,
            });

            return res.status(201).json(newProduct);
        } catch (error) {
            return res.status(500).json({ error: 'Gagal menambahkan produk', detail: error.message });
        }
    }
}

module.exports = new productsController()