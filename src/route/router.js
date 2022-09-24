const express = require('express');
const router = express.Router();
const categoryController = require("../controller/categoryController")



router.post("/createCategory", categoryController.createCategory)
router.put("/updateCategory/:categoryId", categoryController.updateCategory)
router.delete("/deleteCategory/:categoryId", categoryController.deleteCategory)
router.get("/getCategory", categoryController.getCategory)


module.exports = router;