const productsModel = require('../model/productsModel');
const categoriesModel = require('../model/categoriesModel');
const validator = require('validator');

class productsController{
    async GetAllProducts(req,res){
        const products = await productsModel.find().populate('categories_id', 'name');

        res.status(200).json(JSON.stringify(products))
    }

    async AddProduct(req,res){
        const products = await req.body;
        const err = [];
        const existing = categoriesModel.findOne(_id = products.categories_id)

        if(validator.isEmpty(products.name || products.stock || products.price || products.categories_id)){
            err.push({field: 'form', msg : 'tidak boleh kosong selain deskripsi'});
        }

        if(products.categories_id !== existing){
            err.push({field: 'stock or price', msg : 'kategori tidak ada'});
        }

        if(validator.isNumeric(products.stock || products.price)){
            err.push({field: 'stock or price', msg : 'stock dan price harus numeric'});
        }

        if(err.length > 0){
            res.send(404).json(products, err);
        }

        try {
            const newProduct = await productsModel.create({
                nama,
                stock,
                price,
                category_id,
                deskripsi,
            });

            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Gagal menambahkan produk', detail: error.message });
        }
    }
}

module.exports = new productsController()