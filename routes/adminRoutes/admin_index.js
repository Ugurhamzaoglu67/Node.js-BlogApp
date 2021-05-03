const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController')


//_________________ /admin _______________________
router.get('/',adminController.adminIndex)
router.get('/categories',adminController.adminGetCategories)
router.post('/categories',adminController.adminPostCategories)
router.get('/posts',adminController.adminPosts)

//delete
router.delete('/categories/:id',adminController.adminDeleteCategories)
router.delete('/posts/:id',adminController.adminPostDelete)


//edit
router.get('/posts/edit/:id',adminController.adminGetPostEdit)
router.put('/posts/:id',adminController.adminPutEdit)


router.get('/category/edit/:id',adminController.categoryDetailEdit) //SAYFA GELDİ GOSTER
router.put('/category/:id',adminController.adminPutEditCategory) // SAYFA EDIT EDİCEK

module.exports = router


