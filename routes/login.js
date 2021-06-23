const express=require('express')
const model =require('../models/model')

const route =express.Router()

route.get('',(req,res)=>{
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

module.exports=route;