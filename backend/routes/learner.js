const express=require('express');
const router=express.Router();
var Learner=require('../models/learner.model');

router.route('/login/submitlearner').get((req,res)=>{
    Learner.find().then((e)=>res.json(e)).catch(err=>res.status(400).json('notfound'));
});

router.route('/signup/createlearner').post((req,res)=>{
    const phone=req.body.phone;
    const name=req.body.name;
    // console.log(username);
    const learner=new Learner({phone,name});
    console.log(learner)
    learner.save().then(()=>res.json('Added new learner!')).catch(err=>res.status(400).json('Error: ' + err));
});

/* router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id).then(user => {

    user.username=req.body.username;
    user.password=req.body.password;

    user.save().then(() => res.json('Password updated!')).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
}); */

module.exports=router;