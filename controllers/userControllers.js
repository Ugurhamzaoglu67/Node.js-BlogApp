const User = require('../models/Users')



//____________________________________ /users/register -> GET ________________
exports.getRegister = (req,res) => {
    res.render('mysite/register')
}

//____________________________________ /users/register -> POST ________________
exports.postRegister = (req,res) => {

    User.create(req.body)
        .then(() => {
            console.log("Başarı ile kullanıcı oluşturuldu")

            req.session.sessionFlash = {
                type:'alert alert-success',
                message:'User created successfully'
            }
            res.redirect('/users/register')
        })
        .catch(err =>{
            console.log(err)
        })

}

//____________________________________ /users/login -> GET ________________
exports.getLogin = (req,res) => {
    res.render('mysite/login')
}

//____________________________________ /users/login -> POST ________________
exports.postLogin =  (req,res) => {

    const { email, password } = req.body

    User.findOne({email})
        .then(user => {
            if(user){
                if(user.password === password){

                    req.session.userId = user._id //We save as userId to the session

                    console.log(`Welcome : ${user.username}`)
                    res.redirect('/')
                }else {
                    console.log('Password doesnt correct')
                    res.redirect('/users/login')
                }
            }
            else {
                console.log('There is no such user')
                res.redirect('/users/register')
            }
        })
        .catch(err => {
            console.log(err)
        })

}



//____________________________________ /users/logout -> GET ________________
exports.getLogout = (req,res) => { //When logout , session destroy it

    req.session.destroy(() => {
        res.redirect('/')
    })
}