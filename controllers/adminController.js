const Category = require('../models/Category')




//____________________________________ ADMIN / w \ ___________________________
exports.adminIndex = (req,res) => {
    res.render('admin/admin')
}


exports.adminGetCategories = (req,res) => {

    Category.find()
        .then((categories) => {

            console.log(categories)
            res.render('admin/admin_categories',{
                categories : categories,

            })
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

