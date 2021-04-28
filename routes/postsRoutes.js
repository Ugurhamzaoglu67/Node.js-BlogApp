const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/add-post',(req,res) => {
    res.render('mysite/addPost')
})

router.post('/test',(req,res) => {

    Post.create(req.body)
        .then(() => {
            console.log("Post was created successfully...")
            res.redirect('/posts/add-post')
        })
        .catch(err =>{
            console.log(err)
        })

})


module.exports = router