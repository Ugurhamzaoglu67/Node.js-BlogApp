const path = require('path')
const express = require('express')
const exphbs  = require('express-handlebars');
const  app = express()
const hostName = 'localhost'
const port = 3000


app.use(express.static('public')) //All static files....

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')


app.get('/',(req,res) =>{
    res.render('mysite/index')
})


app.get('/about',(req,res) =>{
    res.render('mysite/about')
})


app.get('/blog',(req,res) => {
    res.render('mysite/blog')
})


app.get('/contact',(req,res) => {
    res.render('mysite/contact')
})





app.listen(port,hostName, () => {
    console.log(`Bağlantı Gerçekleşti : http://${hostName}:${port}`)
})