const express = require('express')
const router = express.Router()
const Post = require('../models/Post')


router.get('/',(req,res) =>{
    console.log(req.session)
    res.render('mysite/index')
})

router.get('/about',(req,res) =>{
    res.render('mysite/about')
})

router.get('/blog',(req,res) => {

    Post.find({})
        .then((posts) => {
            res.render('mysite/blog', {
                posts:posts
            })
        })
        .catch(err => {
            console.log(err)
        })

})

router.get('/contact',(req,res) => {
    res.render('mysite/contact')
})




module.exports = router