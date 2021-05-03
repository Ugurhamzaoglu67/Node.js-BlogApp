const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/Users')
const nodemailer = require('nodemailer')
require('dotenv').config()

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

    const postPerPage = 1
    const page  = req.query.page || 1




    Post.find({}).populate( { path:'siteUser', model: User} ).sort( { $natural : -1 } )
        .skip( (postPerPage * page) - postPerPage)
        .limit(postPerPage)
        .then((posts) => {

            Post.countDocuments().then(postCount => {

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
                            current:parseInt(page),
                            pages : Math.ceil(postCount/postPerPage)

                        })
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

//____________________________________ CONTACT /POST MESSAGE___________________________
exports.mainPostContact = (req,res) => {
        console.log(req.session)
        const formEmail = req.body.email

        const outputHTML = `
            <h1>Mail Infos</h1>
            <ul>
                <li>Name : ${req.body.name}</li>
                <li>email : ${req.body.email}</li>
                <li>phone : ${req.body.phone}</li>
           
            </ul>
              <h4>Messsage : </h4>     
              <p>${req.body.message}</p> 
        `

    "use strict";
//___________________________ NODE MAILER ________________________________________________________

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'ugur.hmz52@gmail.com', // generated ethereal user
                pass:`${process.env.EMAIL_PASS}`, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Your message received 👻" <ugur.hmz52@gmail.com>', // sender address
            to: `${formEmail}`, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: outputHTML, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        req.session.sessionFlash = {
            type :'alert alert-success',
            message : 'Mesajınız başarılı bir şekilde gönderildi...'
        }

        res.redirect('/contact')

    }

    main().catch(console.error);


}

//___________________________ NODE MAILER ________________________________________________________