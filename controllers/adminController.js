const Category = require('../models/Category')
const Post = require('../models/Post')
const User = require('../models/Users')
const path = require('path')


//____________________________________ ADMIN / w \ ___________________________
exports.adminIndex = (req,res) => {
    res.render('admin/admin')
}


exports.adminGetCategories = (req,res) => {

    Category.find().sort( { $natural : -1 })
        .then((categories) => {

            console.log(categories)
            res.render('admin/admin_categories',{
                categories : categories,
                path:'/admin'

            })
        })
        .catch(err => {
            console.log(err)
        })

}

exports.adminDeleteCategories = (req,res) => {

    Category.deleteOne({_id: req.params.id})
        .then((result) =>{
            console.log(result)
            console.log("The deleted successfully")
            res.redirect('/admin/categories')
        })
        .catch(err => {
            console.log(err)
        })
}



exports.adminPostCategories = (req,res) => {

    Category.create(req.body)
        .then((result) => {
            console.log(result)

            res.redirect('categories')
        })
        .catch(err => {
            console.log(err)
        })

}



exports.adminPosts = (req,res) => {

    Post.find({}).populate({path:'category',model:Category})
        .sort({$natural : -1})
        .then(posts => {
            console.log(posts)
            res.render('../views/admin/admin_posts.handlebars', {
                posts: posts,


            })
        }).catch(err => {
            console.log(err)
     })

}


exports.adminPostDelete = (req,res) => {

    Post.deleteOne({_id: req.params.id})
        .then((result) =>{
            console.log(result)
            console.log("The deleted successfully")
            res.redirect('/admin/posts')
        })
        .catch(err => {
            console.log(err)
        })
}


exports.adminGetPostEdit = (req,res) => {

    Post.findOne({_id : req.params.id})
        .then(post => {
    Category.find()
        .then(categories => {
            res.render('admin/editpost',{
                post:post,
                categories:categories
            })
        })
    })

};



exports.adminPutEdit = (req,res) => {
    let post_image = req.files.post_image

    post_image.mv(path.resolve(__dirname,'../../public/img/postimg'), post_image.name)

    Post.findOne({_id : req.params.id})
    .then(post => {
        post.title = req.body.title 
        post.content = req.body.content
        post.date = req.body.date
        post.category = req.body.category
        post.post_image = `/img/postimg/${post_image.name}`

        post.save().then(post => {
            res.redirect('/admin/posts')
        })
    })
}