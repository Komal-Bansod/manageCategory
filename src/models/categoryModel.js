const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({

category:{
    type:String,
    unique: true,
    required :true,
},
subcategory:{
    type:Array
}


}, {timestamps:true})

module.exports = mongoose.model("category", CategorySchema)