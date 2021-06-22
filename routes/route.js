const { query } = require('express');
const express=require('express')
const model =require('../models/model')

const route =express.Router()

route.get('',async(req,res)=>{
    try{
        const mod=await model.find()
        res.render('people',{
            persons:mod
        })
    }catch{
        res.redirect('/')
    }
});

route.post('/submitted',(req,res)=>{
    const person=new model({
        name:req.body.name,
        class:req.body.class,
        gender:req.body.gender,
        address:req.body.address,
        email:req.body.email
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

route.get('/singleid',async(req,res)=>{
    let options={name:null}
    if(req.query.name!=null && req.query.name!=''){
        options={
            name:{$regex: new RegExp(req.query.name)}
        }
    }
    try{
        const mod=await model.find(options)
        res.render('single',{
            persons:mod 
        })
    }catch{
        console.log("error in finding name")
        res.redirect('/people/single')
    }
});

module.exports=route;