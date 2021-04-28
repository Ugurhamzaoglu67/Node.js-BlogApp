const path = require('path')
const express = require('express')
const exphbs  = require('express-handlebars');
const  app = express()
const hostName = 'localhost'
const port = 3000
const mongoose = require('mongoose')


const mainRoutes = require('./routes/main.js')



app.use(express.static('public')) //All static files....

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

//___________________________________  ROUTES ________________________________

app.use(mainRoutes)

//________________________________________  LOCALHOST ___________________
app.listen(port,hostName, () => {
    console.log(`Bağlantı Gerçekleşti : http://${hostName}:${port}`)
})