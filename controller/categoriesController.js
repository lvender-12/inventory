const productsModel = require('../model/productsModel')
const categoriesModel = require('../model/categoriesModel')
const validator = require('validator');
const mongoose = require('../config/db')

class categoriesController{
    async GetAllCategories(req,res){
        const categories = await categoriesModel.find();

        return res.status(200).json(JSON.stringify(categories))
    }

    async AddCategories(req,res){
        try {
            const category = req.body.name
            const cekCategory = await categoriesModel.findOne({name: category})
            const err = []

            if(validator.isEmpty(category)){
                err.push({field: "name", msg : "name tidak boleh kosong"})
            }

            if(cekCategory){
                err.push({field: "name", msg:"category sudah ada"})
            }

            if(err.length > 0 ){
                return res.status(400).json({ errors: err, inputData: category  });
            }

            const result = await categoriesModel.create({
                name : category,
            });

            return res.status(201).json({result})

        } catch (error) {
            return res.status(500).json({ error: 'Gagal Menambah Categori', detail: error.message });
        }
    }

    async GetCategory(req,res){
        try {
            const body = req.body
            const category = await categoriesModel.findById({_id : body.id})
            const err = [];

            if(!category){
                err.push({field: "Category", msg: "category tidak ada, silahkan daftar dulu"})
            }

            if(err.length > 0 ){
                return res.status(400).json({ errors: err, inputData: category  });
            }

            return res.status(201).json(category);

        } catch (error) {
            return res.status(500).json({ error: 'Gagal mengambil product produk', detail: error.message });
        }
    }

    async UpdateCategory(req, res) {
        try {
            const { id, name } = req.body;
            const err = [];

            // Validasi ID kosong atau tidak valid
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                err.push({ field: 'id', msg: 'ID tidak valid atau kosong' });
            }

            // Validasi name kosong
            if (validator.isEmpty(name || '')) {
                err.push({ field: 'name', msg: 'Nama tidak boleh kosong' });
            }

            // Cek apakah kategori ada
            const existingCategory = await categoriesModel.findById(id);
            if (!existingCategory) {
                err.push({ field: 'id', msg: 'Kategori tidak ditemukan' });
            }

            // Jika ada error, return
            if (err.length > 0) {
                return res.status(400).json({ errors: err, inputData: { id, name } });
            }

            // Update kategori
            const result = await categoriesModel.updateOne(
                { _id: id },
                { $set: { name: name } }
            );

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Gagal Update Category', detail: error.message });
        }
    }

    async DeleteCategories(req,res){
        try {
            const err = [];
            const id = req.body.id;
            const category = await categoriesModel.findById(id)
            if(!category){
                err.push({field: 'Data', msg : 'Tidak menemukan Categories'});
            }else{
                await categoriesModel.deleteOne({_id: id })
                return res.status(200).json({category});
            }
        } catch (error) {
            return res.status(500).json({ error: 'Gagal menghapus category', detail: error.message });
        }
    }
}

module.exports = new categoriesController()