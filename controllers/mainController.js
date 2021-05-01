const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/Users')

//____________________________________ INDEX ___________________________
exports.mainIndex = (req,res) =>{
    console.log(req.session)

    res.render('mysite/index')
}

//____________________________________ ABOUT ___________________________
exports.mainAbout = (req,res) =>{
    res.render('mysite/about')
}

//____________________________________ BLOG ___________________________
exports.mainBlog = (req,res) => {

    Post.find({}).populate( { path:'siteUser', model: User} ).sort( { $natural : -1 } )
        .then((posts) => {
           Category.aggregate([
               {
                   $lookup:{
                       from:'posts',
                       localField:'_id',
                       foreignField:'category',
                       as:'posts' //Bu şekilde al
                   }
               },

               /*
               * localField:'id' -> Category id  match with posts return to as 'posts'
               * */

               {
                   $project:{
                       _id:1,
                       name:1,
                       num_of_posts : {$size:'$posts'} //Birbiriyle ilişkili olanların sayısını alıyor..
                   }
               }



           ])
               .then(categories => {
               res.render('mysite/blog', {
                   posts:posts,
                   categories:categories,

                     })
                })
        })
        .catch(err => {
            console.log(err)
        })

}
//____________________________________ CONTACT ___________________________
exports.mainContact = (req,res) => {
    res.render('mysite/contact')
}


