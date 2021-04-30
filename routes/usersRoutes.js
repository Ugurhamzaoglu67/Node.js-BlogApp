const express = require('express')
const router = express.Router()
const User = require('../models/Users')

//________________________________________ users/register___________________
router.get('/register',(req,res) => {
    res.render('mysite/register')
})


router.post('/register',(req,res) => {

    User.create(req.body)
        .then(() => {
            console.log("Başarı ile kullanıcı oluşturuldu")
            res.redirect('/')
        })
        .catch(err =>{
            console.log(err)
        })

})


//________________________________________ users/login___________________
router.get('/login',(req,res) => {
    res.render('mysite/login')
})

router.post('/login',(req,res) => {

   const { email, password } = req.body

    User.findOne({email})
        .then(user => {
            if(user){
                    if(user.password === password){
                        console.log(`Hoş geldin : ${user.username}`)
                        res.redirect('/')
                    }else {
                        console.log('Şifre  yanlış, tekrar deneyin..')
                        res.redirect('/users/login')
                    }
            }
            else {
                console.log('Böyle bir kullanıcı yok kayıt ol')
                res.redirect('/users/register')
            }
        })
        .catch(err => {
            console.log(err)
        })




})

module.exports = router