const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const path = require('path')


router.get('/add-post',(req,res) => {
        if(req.session.userId){
          return  res.render('mysite/addPost')
        }
        else {
            return res.redirect('/users/login')
        }

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

    let post_image = req.files.post_image
    post_image.mv(path.resolve(__dirname,'../public/img/postimg',post_image.name))

    Post.create({
            ...req.body,
            post_image:`/img/postimg/${post_image.name}`
    })
    .then(() => {
        console.log("Post was created successfully...")
        res.redirect('/blog')
    })
    .catch(err =>{
        console.log(err)
    })

})


module.exports = router