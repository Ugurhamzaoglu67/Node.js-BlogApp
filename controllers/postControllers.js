const Post = require('../models/Post')
const Category = require('../models/Category')
const path = require('path')
const User = require('../models/Users')


//___________________________________________ getAddPost_____________________________
exports.getAddPost = (req,res) => {

           if(req.session.userId){

                   Category.find()
                       .then(categories => {
                       return res.render('mysite/addPost',{
                           categories:categories
                       })

                   }).catch(err =>{
                       console.log(err)
                   })

           }
           else {
               return res.redirect('/users/login')
           }


}

//___________________________________________ getAddPostDetail_____________________________
exports.getPostDetail = (req,res)=> {

    Post.findById(req.params.id).populate( { path:'siteUser', model: User} )
        .then(post => {

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

                Post.find().populate({path:'siteUser',model:User}).sort({$natural:-1})
                    .then(posts => {

                        res.render('mysite/singlePost',{
                            post:post,
                            categories:categories,
                            posts:posts
                        })
                    })

            })

        })
        .catch(err => {
            console.log(err)
        })

}


//___________________________________________ postTest _____________________________
exports.postTest = (req,res) => {

        let post_image = req.files.post_image
        post_image.mv(path.resolve(__dirname,'../public/img/postimg',post_image.name))

        Post.create({
            ...req.body,
            post_image:`/img/postimg/${post_image.name}`,
            siteUser : req.session.userId
        })
        .then(() => {
            console.log("Post was created successfully...")
            res.redirect('/blog')
        })
        .catch(err =>{
            console.log(err)
        })



        req.session.sessionFlash = {
            type:'alert alert-success',
            message :'Post successfully added...'
        }

}


exports.getCategoryId= (req,res) => {

       Post.find({ category:req.params.mycategoryId }).populate( { path:'category', model:Category} )

           .then(posts => {
               console.log(req.params)
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

               ]).then(categories => {
                    res.render('mysite/blog',{
                        posts:posts,
                        categories:categories
                    })
               })
           })

}
