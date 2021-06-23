if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
const express=require('express')
const mongoose=require('mongoose')
const port=process.env.PORT || 5000
const bodyParser=require('body-parser')
const app =express()
const route=require('./routes/route')
const login=require('./routes/login')
const signin=require('./routes/signin')
app.set('view engine','ejs')
app.set('views',__dirname+'\\views')
app.use(express.static('media'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,useUnifiedTopology: true })
const mdb=mongoose.connection

mdb.on('open',()=>{
    console.log("new DB is connected now...")
});

app.use('/people',route)
app.use('',login)
app.use('/signin',signin)


app.listen(port);