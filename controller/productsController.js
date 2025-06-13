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
        const cekProduct = await productsModel.findOne({name : products.name});
        const err = [];

        if(validator.isEmpty(products.name || products.stock || products.price || products.categories_id)){
            err.push({field: 'form', msg : 'tidak boleh kosong selain deskripsi'});
        }

        if(cekProduct){
            err.push({field: "form", msg : "product sudah ada"});
        }

        if (!mongoose.Types.ObjectId.isValid(products.categories_id)) {
            err.push({ field: 'form', msg: 'ID kategori tidak valid' });
        } else {
            const existing = await categoriesModel.findById(products.categories_id);
            if (!existing) {
                err.push({ field: 'form', msg: 'Kategori tidak ditemukan' });
            }
            
        }

        
        if(!validator.isNumeric(products.stock || products.price)){
            err.push({field: 'stock or price', msg : 'stock dan price harus numeric'});
        }

        products.stock = Number(products.stock)
        products.price = Number(products.price)
        
        if (err.length > 0) {
            return res.status(400).json({ errors: err, inputData: products  });
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

    async GetProduct(req,res){
        try {
            const categories = await categoriesModel.find();
            const product = await productsModel.findById(req.body.product_id);
            return res.status(200).json({
                categories,
                product,
            });
        } catch (error) {
            return res.status(500).json({ error: 'Gagal mengambil product', detail: error.message });
        }
    }

    async UpdateProduct(req,res){
        try {
            const err = [];
            const product = req.body;

            if(validator.isEmpty(product.name || product.stock || product.price || product.categories_id)){
                err.push({field: 'form', msg : 'tidak boleh kosong selain deskripsi'});
            }

            if (!mongoose.Types.ObjectId.isValid(product.categories_id)) {
                err.push({ field: 'categories_id', msg: 'ID kategori tidak valid' });
            } else {
                const existing = await categoriesModel.findById(product.categories_id);
                if (!existing) {
                    err.push({ field: 'categories_id', msg: 'Kategori tidak ditemukan' });
                }
                
            }

            if(!validator.isNumeric(product.stock || product.price)){
                err.push({field: 'stock or price', msg : 'stock dan price harus numeric'});
            }

            product.stock = Number(product.stock)
            product.price = Number(product.price)
            
            if (err.length > 0) {
                return res.status(400).json({ errors: err, inputData: product  });
            }

            const newProduct = await productsModel.updateOne(
                {
                    _id: product._id
                },
                {
                    $set:{
                        name:product.name,
                        stock: product.stock,
                        price: product.price,
                        categories_id: product.categories_id,
                        deskripsi: product.deskripsi
                    }
                }
            );

            return res.status(201).json(newProduct);

        } catch (error) {
            return res.status(500).json({ error: 'Gagal Update Produk', detail: error.message });
        }
    }

    async DeleteProduct(req,res){
        try {
            const err = [];
            const id = req.body._id;
            const product = await productsModel.findById(id)
            if(!product){
                err.push({field: 'stock or price', msg : 'stock dan price harus numeric'});
            }else{
                await productsModel.deleteOne({_id: id })
                return res.status(200).json({product});
            }
        } catch (error) {
            return res.status(500).json({ error: 'Gagal menghapus produk', detail: error.message });
        }
    }
}

module.exports = new productsController()