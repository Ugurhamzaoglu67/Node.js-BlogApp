const Category = require('../models/Category')




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

