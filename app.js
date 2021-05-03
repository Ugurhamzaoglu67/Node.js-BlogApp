const express = require('express')
const  app = express()
const hostName = 'localhost'
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const exphbs  = require('express-handlebars');

const expressSession = require('express-session')
const MongoStore = require('connect-mongo');

const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
//________________________________ HELPERS ___________________________________________
const {generateDate} = require('./helpers/generateDate')
const {limit}  = require('./helpers/limit')
const {truncate} = require('./helpers/truncate')
const {paginate} = require('./helpers/paginate')




//_________________ db connect_______________________________________________
const dbUrl = `mongodb+srv://Nodeblog_db:${process.env.DB_PASS}@cluster0.qddi3.mongodb.net/Nodeblog?retryWrites=true&w=majority`

mongoose.connect(dbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true}
)
    .then((result)=> app.listen(port,hostName, () => {
        console.log(`Bağlantı Gerçekleşti : http://${hostName}:${port}`)
    }))
    .catch((err)=> console.log(err))


app.use(fileUpload())
app.use(methodOverride('_method'))

//___________________________________ SESSION ______________________________________
app.use(expressSession({
    secret:'my_secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: dbUrl })
}))



//____________________________________ Display href link Middleware ___________________


app.use((req, res, next) => {

    const {userId} = req.session
    if (userId) {
        res.locals = {
            displayLink: true
        }
    }
    else {
        res.locals = {
            displayLink: false
        }
    }

    next()

})

//____________________________________ Flash Message Middleware_____________________
app.use((req,res,next) => {
    res.locals.sessionFlash = req.session.sessionFlash
    delete req.session.sessionFlash

    next()
})

app.use(express.static('public')) //All static files....


//___________________________________ Handlebars Config______________________
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    helpers: {generateDate,limit,truncate,paginate}


}));
app.set('view engine', 'handlebars');




//____________________________ bodyParser (for data from the form)________________________________

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//___________________________________  ROUTES ________________________________

const mainRoutes = require('./routes/main.js')
const postsRoutes = require('./routes/postsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const adminRoutes = require('./routes/adminRoutes/admin_index.js')

app.use(mainRoutes)
app.use('/posts',postsRoutes)
app.use('/users',usersRoutes)
app.use('/admin',adminRoutes)