const express = require('express');
const router = express.Router();

const notice = require('../db/noticeModel');
const problem = require('../db/problemModel');
const user = require('../db/userModel');

router.get('/',wrap(async(req,res)=>{
    const notices = await notice.find({}).sort({date:-1}).limit(5);
    const problems = await problem.find({}).sort({date:-1}).limit(5);
    const rankers = await user.find({}).sort({solvedProblemsAmount:-1}).limit(5);
    await res.render('main',{
        notices: notices,
        problems: problems,
        ranker: rankers
    });
}));