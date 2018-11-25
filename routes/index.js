const express = require('express');
const router = express.Router();

const notice = require('../db/noticeModel');
const problem = require('../db/problemModel');
const user = require('../db/userModel');
const wrap = require('../bin/wrap');

router.get('/',wrap(async(req,res)=>{
    const notices = await notice.find({}).sort({date:-1}).limit(5);
    const problems = await problem.find({}).sort({date:-1}).limit(5);
    const rankers = await user.find({}).sort({solvedProblemsAmount:-1}).limit(5);
    let logined;
    if(req.session.id !== undefined) logined = req.session.id;
    else logined = null;
    res.render('main', { notices: [], problems: [], ranker: [], logined: logined},);
}));

module.exports = router;