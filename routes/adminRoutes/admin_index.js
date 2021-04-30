const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController')


//_________________ /admin _______________________
router.get('/',adminController.adminIndex)
router.get('/categories',adminController.adminGetCategories)
router.post('/categories',adminController.adminPostCategories)
router.delete('/categories/:id',adminController.adminDeleteCategories)

module.exports = router