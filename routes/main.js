const express = require('express')
const router = express.Router()

const mainController = require('../controllers/mainController')





router.get('/',mainController.mainIndex)
router.get('/about',mainController.mainAbout)
router.get('/blog',mainController.mainBlog)
router.get('/contact',mainController.mainContact)



module.exports = router