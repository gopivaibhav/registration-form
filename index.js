require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const port=process.env.PORT || 5000
const bodyParser=require('body-parser')
const app =express()
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: true }));
const login=require('./routes/login')
const signin=require('./routes/signin')
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.use(express.static('media'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,useUnifiedTopology: true }).then(res=>{
    console.log(`DB connected`)
})


app.use('/',login)
app.use('/signin',signin)


app.listen(port,()=>{console.log(`listening on ${port}`)});