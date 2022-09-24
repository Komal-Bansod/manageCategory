const categoryModel = require("../models/categoryModel")

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const isValid = function (value) {
    if (typeof value == undefined || value == null || value.length == 0) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if(typeof value === 'number' && value.toString().trim.length === 0) return false
    return true

}

const createCategory = async function (req, res) {
    try{
 const {category, subcategory} = req.body

if(!isValidRequestBody(req.body)){
    return res.status(400).send({ status: false, messege: "plz enter some data", data:null })
}
if (!isValid(category)) {
    return res.status(400).send({ status: false, messege: "category is required", data:null })

}
const duplicateCategory = await categoryModel.findOne({category: category })

if (duplicateCategory) {
    return res.status(409).send({ status: false, msg: " category is already present" , data:duplicateCategory})
}
    createCategoryBody = await categoryModel.create(req.body)
    return res.status(201).send({ status: true, messege: "category createdd successfully", data: createCategoryBody })
}

catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
}

}


const updateCategory = async function (req, res) {

    try {
    const { category, subcategory } = req.body
    let categoryId = req.params.categoryId
    let updateCategoryBody = await categoryModel.findOneAndUpdate({ _id: categoryId }, { $set: { category: category, subcategory: subcategory } }, { new: true })

    return res.status(200).send({ status: true, messege: "category updaated successfully", data: updateCategoryBody })

}

catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
}

}


const deleteCategory = async function (req, res) {
    try{
    let categoryId = req.params.categoryId
    let findCateory = await categoryModel.findByIdAndDelete(categoryId)
    if (findCateory) {
        return res.status(200).send({ status: true, message: "category Delete Successfully", data: findCateory })
    } else
        return res.status(400).send({ status: false, message: "Id not present in db,  Its deleted OR wrong Please try another id", data: null })
    }

    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



const getCategory = async function (req, res) {
    try{
    let query = req.query
    let { search,page, limit,category} = query
    let skip = (page-1) * limit
    if (!page) page = 1
    if (!limit) limit = 1
    
   
    let allCategory = await categoryModel.find
    ({$or:[{category:{$regex:".*"+search+".*", $options:'i'}}, {subcategory:{$regex:".*"+search+".*", $options:'i'}}]})
    .sort({category:category}).skip(skip).limit(limit)
    
    return res.status(200).send({ status: true, message: "get all category", data: allCategory })
}

catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
}

}
module.exports = { createCategory, updateCategory, deleteCategory, getCategory }