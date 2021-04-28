const express = require('express')
const router = express.Router()



router.get('/',(req,res) =>{
    res.render('mysite/index')
})

router.get('/about',(req,res) =>{
    res.render('mysite/about')
})

router.get('/blog',(req,res) => {
    res.render('mysite/blog')
})

router.get('/contact',(req,res) => {
    res.render('mysite/contact')
})

router.get('/login',(req,res) => {
    res.render('mysite/login')
})

router.get('/register', (req,res) => {
    res.render('mysite/register')
})

router.get('/posts/add-post',(req,res) => {
    res.render('mysite/addPost')
})


router.post('/post/test',(req,res) => {


    res.send('qwewq')
})


module.exports = router