const express = require('express')
const model = require('../models/model')
var unirest = require("unirest");
const route = express.Router()
const session = require("express-session");

route.get('/', (req, res) => {
    req.session.isAuth=false
    res.render('enter')
})

route.post('/', async (req, res) => {
    let mailOpt = {
        email: req.body.email
    };
    let pasOpt = {
        password: req.body.password
    };
    try {
        const mailObj = await model.find(mailOpt);
        if(mailObj.length===0){
            res.render('enter',{msg:"No User found",email:mailOpt.email})
        }else{
        const passObj = await model.find(pasOpt);
        if (String(passObj[0]._id) === String(mailObj[0]._id)) {
            req.session.isAuth=true
            req.session.user=mailObj[0]
            res.redirect('/main')
        } else {
            res.render('enter',{msg:"Wrong Password",email:mailOpt.email})
        }
    }
    }
    catch {
        res.render('enter',{msg:"Wrong Password",email:mailOpt.email})
    }
});

route.get('/main', async (request, res) => {
    if (request.session.isAuth) {
        if (request.query.movie) {
            req = unirest("GET", "https://imdb8.p.rapidapi.com/auto-complete");
            req.query({
                "q": request.query.movie
            });

            req.headers({
                "x-rapidapi-key": "210bcfaf99mshbc2b6137d990c8fp1c2e89jsn862f7adc44cf",
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "useQueryString": true
            });

            req.end(function (response) {
                if (response.error) throw new Error(response.error);

                filmArray = response.body.d
                res.render('main', { array: filmArray , inp: request.query.movie})
            });
        }else{
            res.render('main',{array:[],inp: ''})
        }
    } else {
        res.render('loggedout')
    }
});
route.get('/profile',(req,res)=>{
    if(req.session.isAuth){
        res.render('landing',{person:req.session.user})
    }else{
        res.render('loggedout')
    }
})
route.get('/people', async (req, res) => {
    try {
        if (req.session.isAuth) {
            const mod = await model.find()
            res.render('people', {
                persons: mod
            })
        } else {
            res.render('loggedout')
        }

    } catch {
        res.redirect('/')
    }
});


route.get('/people/singleid', async (req, res) => {
    let options = { name: null }
    if (req.query.name != null && req.query.name != '') {
        options = {
            name: { $regex: new RegExp(req.query.name) }
        }
    }
    try {
        if (req.session.isAuth) {
            const mod = await model.find(options)
            res.render('single', {
                persons: mod,
                inp:req.query.name
            })
        } else {
            res.render('loggedout')
        }

    } catch {
        res.redirect('/people/single')
    }
});

module.exports = route;