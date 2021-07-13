const express=require('express')
const model =require('../models/model')
let status=require('./class')
const route =express.Router()


route.get('',(req,res)=>{
    res.render('signin')
});


route.post('',(req,res)=>{
    const person=new model({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        location:req.body.location,
        dob:req.body.dob
    })
    person.save()
    .then(result=>{
        res.status(200).redirect('/')
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
            
});

module.exports=route