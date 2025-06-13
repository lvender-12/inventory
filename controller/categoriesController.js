const productsModel = require('../model/productsModel')
const categoriesModel = require('../model/categoriesModel')

class categoriesController{
    async GetAllCategories(req,res){
        const categories = await categoriesModel.find();

        res.status(200).json(JSON.stringify(categories))
    }

    async AddProduct(req,res){
        
    }
}

module.exports = new categoriesController()