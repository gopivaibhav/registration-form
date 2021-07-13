const express=require('express')
const model =require('../models/model')
let status=require('./class')
const route =express.Router()

route.get('',(req,res)=>{
    status=0;
    res.render('login')
})

route.post('',async(req,res)=>{
    let mailOpt={
        email:req.body.email
    };
    let pasOpt={
        password:req.body.password
    };
        try{
            const mailObj= await model.find(mailOpt);
            const passObj=await model.find(pasOpt);
            if(String(passObj[0]._id)===String(mailObj[0]._id)){
                status=1;
                console.log(status)
                res.render('landing',{
                    person:mailObj[0]
                })
            }else{
                res.send("Invalid login")
            }
        }
        catch{
            res.send("Wrong Credentials")
        }
});

route.get('/main',(req,res)=>{
    console.log(status)
    if(status==1){
        res.render('main')
    }else{
        res.send("You are logged out")
    }
});

/////////////////////////////////////////////////////////////////////

route.get('/people',async(req,res)=>{
    try{
        const mod=await model.find()
        console.log(status)
        if(status==1){
            res.render('people',{
                persons:mod
            })
        }else{
            res.send("You are logged out")
        }
        
    }catch{
        res.redirect('/')
    }
});


route.get('/people/singleid',async(req,res)=>{
    let options={name:null}
    if(req.query.name!=null && req.query.name!=''){
        options={
            name:{$regex: new RegExp(req.query.name)}
        }
    }
    try{
        console.log(status)
        if(status==1){
            const mod=await model.find(options)
            res.render('single',{
            persons:mod 
        })
        }else{
            res.send("You are logged out")
        }
        
    }catch{
        console.log("error in finding name")
        res.redirect('/people/single')
    }
});

module.exports=route;