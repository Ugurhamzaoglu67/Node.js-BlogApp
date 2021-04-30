const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')

//________________________________________ users/register___________________
router.get('/register',userController.getRegister)


router.post('/register',userController.postRegister)


//________________________________________ users/login___________________
router.get('/login',userController.getLogin)

router.post('/login',userController.postLogin)

module.exports = router