const express = require('express')
const app = express()
const mongo = require('mongoose')
const path = require('path')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')
const cookie = require('cookie-parser')
const session = require('express-session')
const {url} = require('./config/database.js')
const bodyParser = require('body-parser')

//settings
app.set('port',process.env.PORT || 3000)


app.set('views', path.join(__dirname ,'views'))
app.set('view engine', 'ejs')  //Definir motor de plantillas

require('./config/passport')(passport)


mongo.connect(url,
    {
       
    
    
    })


//middleweres
app.use(morgan('dev'))
app.use(cookie())
app.use(bodyParser.urlencoded({extended:false}))
app.use(session(
    {
     secret:'cloud',
     resave:false,
     saveUninitialized:false
    }
))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


//routes
require('./app/routes.js')(app, passport)

//static files
app.use(express.static(__dirname +'/public/'))





app.listen(3000,()=>
{
    console.log('Server up')
})