const express = require('express')
const router = express.Router()
const postController = require('../controllers/postControllers.js')



router.get('/add-post',postController.getAddPost)
router.get('/detail/:id',postController.getPostDetail)
router.post('/test',postController.postTest)
router.get('/category/:mycategoryId',postController.getCategoryId)
router.get('/searching',postController.getSearching)


module.exports = router