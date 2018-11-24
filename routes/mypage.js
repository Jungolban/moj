const express = require('express');
const router = express.Router();

const User = require('../db/userModel');
const wrap = require('../bin/wrap');

router.get('/',wrap(async(req,res)=>{
    const user = User.findOne({id:req.session.id});
    res.render('mypage',{user:user});
}));