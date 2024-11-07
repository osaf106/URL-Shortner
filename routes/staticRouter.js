const express = require('express')
const router = express.Router();
const URL = require('../models/url');
const { restrictTo } = require('../middleWare/auth');

router.get('/display',restrictTo(["NORMAL"]),async(req,res)=>{
    // if(!req.user._id) return res.redirect("/login")
    const findallURL = await URL.find({ craetedBy: req.user._id});
console.log(findallURL)
    return res.render("home", {urls: findallURL})
})

router.get('/signup',async(req,res)=>{
    return res.render('signup')
})
router.get('/login',async(req,res)=>{
    return res.render('login')
})


module.exports = router;