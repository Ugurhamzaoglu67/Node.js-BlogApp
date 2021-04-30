const Post = require('../models/Post')
const Category = require('../models/Category')
const path = require('path')



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

    Post.findById(req.params.id)
        .then(post => {

            Category.find({}).sort({ $natural : -1})
                .then((categories) => {
                    res.render('mysite/singlePost',{
                        post:post,
                        categories:categories
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
            post_image:`/img/postimg/${post_image.name}`
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