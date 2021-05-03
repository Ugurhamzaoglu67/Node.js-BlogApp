const Category = require('../models/Category')
const Post = require('../models/Post')
const path = require('path')
const User = require('../models/Users')

//____________________________________ ADMIN / w \ ___________________________
exports.adminIndex = (req,res) => {
    res.render('admin/admin')
}


exports.adminGetCategories = (req,res) => {

        Category.find()
        Category.aggregate([
                {
                    $lookup:{
                        from:'posts',
                        localField:'_id',
                        foreignField:'category',
                        as:'posts' //Bu şekilde al
                    }
                },

                {
                    $project:{
                        _id:1,
                        name:1,
                        num_of_posts : {$size:'$posts'} //Birbiriyle ilişkili olanların sayısını alıyor..
                    }
                }

            ])
            .then((categories) => {

                res.render('admin/admin_categories',{
                    categories : categories,

                })
            })
            .catch(err => {
                console.log(err)
            })

}

exports.adminDeleteCategories = (req,res) => {

    Category.deleteOne({_id: req.params.id})
        .then((result) =>{

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

    Post.find({})
        .populate({path:'category',model:Category})
        .populate( { path:'siteUser', model:User} )
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

//Önce sayfası GET İle GETİR
exports.categoryDetailEdit = (req,res) => {

    Category.findOne({_id: req.params.id})
        .then(category => {
            console.log(category)
            res.render('admin/editcategory',{
                category:category
            })
        })
        .catch(err =>{
            console.log(err)
        })


}

exports.adminPutEditCategory = (req,res) => {

    Category.findOne({_id:req.params.id})
        .then(category => {
            category.name = req.body.category

            category.save()
                .then(() =>{
                    console.log('Category güncelleme başarılı..')
                    res.redirect('/admin/categories')
                })
                .catch(err => {
                    console.log(err)
                })
        }).catch(err =>{
            console.log(err)
         })

}



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