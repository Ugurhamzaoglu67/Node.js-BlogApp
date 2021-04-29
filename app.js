const express = require('express')
const  app = express()
const hostName = 'localhost'
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const Handlebars = require('handlebars')
const exphbs  = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


const fileUpload = require('express-fileupload')


//_________________ db connect__________________________

const dbUrl = `mongodb+srv://Nodeblog_db:${process.env.DB_PASS}@cluster0.qddi3.mongodb.net/Nodeblog?retryWrites=true&w=majority`

mongoose.connect(dbUrl, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
    .then((result)=> app.listen(port,hostName, () => {
        console.log(`Bağlantı Gerçekleşti : http://${hostName}:${port}`)
    }))
    .catch((err)=> console.log(err))


app.use(fileUpload())


const mainRoutes = require('./routes/main.js')
const posts = require('./routes/postsRoutes')


app.use(express.static('public')) //All static files....

//___________________________________ Handlebars Config______________________
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');


const myMiddleware = (req,res,next) =>{

    console.log("Hello Amerika...")
    next()
}

app.use('/',myMiddleware)




//____________________________ bodyParser (for data from the form)________________________________

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//___________________________________  ROUTES ________________________________

app.use(mainRoutes)
app.use('/posts',posts)


