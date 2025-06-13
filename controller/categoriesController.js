const productsModel = require('../model/productsModel')
const categoriesModel = require('../model/categoriesModel')

class categoriesController{
    async GetAllCategories(req,res){
        const categories = await categoriesModel.find();

        return res.status(200).json(JSON.stringify(categories))
    }
}

module.exports = new categoriesController()