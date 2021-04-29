const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/add-post',(req,res) => {
    res.render('mysite/addPost')
})


router.get('/detail/:id',(req,res)=> {

    Post.findById(req.params.id)
        .then(post => {
            res.render('mysite/singlePost',{
                post:post
            })
        })
        .catch(err => {
            console.log(err)
        })


})


router.post('/test',(req,res) => {

    Post.create(req.body)
        .then(() => {
            console.log("Post was created successfully...")
            res.redirect('/blog')
        })
        .catch(err =>{
            console.log(err)
        })

})


module.exports = router