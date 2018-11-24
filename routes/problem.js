const express = require('express');
const router = express.Router();

const Problem = require('../db/problemModel');
const User = require('../db/userModel');
const wrap = require('../bin/wrap');

router.get('/list',(req,res)=>{
    const page = req.param('num',1);
    const skipSize = (page-1)*10;
    Problem.find({}).sort({date:-1}).skip(skipSize).limit(10)
    .then((result) => {
        res.render('problemlist', {problems:result});
    }).catch((err) => {
      console.error(err);
    });
});

router.get('/wrongs',(req,res)=>{
    const page = req.param('num',1);
    const skipSize = (page-1)* 10;
    User.find({id:req.session.id}).populate('wrongProblems').skip(skipSize).limit(10)
    .then((result) => {
        res.render('wrongproblem',{problems:result});
    }).catch((err) => {
        console.error(err);
    });
});

router.get('/:num',(req,res)=>{
    Problem.findOne({id:num})
    .then((result) => {
        res.render('problem',{problem:result});
    }).catch((err) => {
        console.error(err);
    });
});

router.get('/upload',wrap(async (req,res)=>{
    const userId = await User.findOne({id:req.session.id})._id;
    const newProblem = await new Problem({
        title: req.body.title,
        contents: req.body.contents,
        answer: req.body.answer,
        classfication: req.body.classfication,
        authow: userId
    });
    await newProblem.save();
    await res.render('redirect',{message:'문제 등록이 되었습니다', location: '/list'});
    }
));

router.post('/submit/:num',wrap(async(req,res)=>{
    const problem = await Problem.findOneAndUpdate({id:req.params.num},{$inc:{submission:1}});
    if(problem.answer === req.answer){
        await User.findOneAndUpdate({id:req.session.id},{$inc:{solvedProblemsAmount:1},$push:{solvedProblems:problem._id}});
        await Problem.findByIdAndUpdate(problem._id,{$inc:{correct:1}})
        res.render('redirect', { message: '맞았습니다!', location: '/problem/' + req.params.num })
    }
    else {
        User.findOneAndUpdate({ id: req.session.id }, {$push: {wrongProblems: problem._id } });
        res.render('redirect', { message: '틀렸습니다!', location: '/problem/' + req.params.num });
    }
}));
