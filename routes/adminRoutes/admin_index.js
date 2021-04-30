const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController')


//_________________ /admin _______________________
router.get('/',adminController.adminIndex)
router.get('/categories',adminController.adminCategories)



module.exports = router