const express = require('express');
const router = express.Router();

const User = require('../db/userModel');

router.get('/login',(req,res) => {
    res.render('login');
});
router.post('/login',(req,res) => {
    const id = req.body.id;
    const pw = req.body.pw;

    User.findOne({ID:id})
    .then((result) => {
        if(result.PW === pw){
            req.session.name = id;
            res.render('redirect', { message: '로그인 되었습니다', location: '/' });
        }
    }).catch((err) => {
        console.error(err);
    });
});

router.get('/register',(req,res)=>{
    res.render('register.html'); 
});

router.post('/register',(req,res) =>{
    const id = req.body.id;
    const pw = req.body.pw;

    User.find({ID:id})
    .then((result) => {
        if (result == []) res.render('redirect', { message: '이미 가입된 아이디 입니다', location: '/auth/register' });
        else{
            const newUser = new User({
                ID:id,
                PW:pw
            });
            newUser.save()
            .then(() => {
                req.session.name = id;
                res.render('redirect',{message:'회원가입 되었습니다', location:'/'});
            }).catch((err) => {
                console.error(err);
            
            });
        }
    }).catch((err) => {
        console.error('err');
    });
}); 
 
module.exports = router;