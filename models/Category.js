const mongoose = require('mongoose')



const CategorySchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        minlength:2,
        maxlength:50,
    },
    date : {
        type : Date,
        default : Date.now
    }

})



module.exports = mongoose.model('Category',CategorySchema)