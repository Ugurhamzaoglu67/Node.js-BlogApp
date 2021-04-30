const Post = require('../models/Post')



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

    Post.find({}).sort( { $natural : -1 } )
        .then((posts) => {
            res.render('mysite/blog', {
                posts:posts
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


