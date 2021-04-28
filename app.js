const path = require('path')
const express = require('express')
const  app = express()
const hostName = 'localhost'
const port = 3000


app.use(express.static('public')) //All static files....



app.get('/',(req,res) => {
    res.sendFile(path.resolve(__dirname,'mysite/index.html'))
})


app.get('/about',(req,res) =>{
    res.sendFile(path.resolve(__dirname,'mysite/about.html'))
})

app.get('/blog',(req,res) =>{
    res.sendFile(path.resolve(__dirname,'mysite/blog.html'))
})


app.listen(port,hostName, () => {
    console.log(`Bağlantı Gerçekleşti : http://${hostName}:${port}`)
})