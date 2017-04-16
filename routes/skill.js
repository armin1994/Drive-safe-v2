var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Skill = models.skill;
/* GET home page. */

router.post('/', (req, res, next)=> {
    var temp = new Skill(req.body);
    temp.save((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
});
router.get('/', (req, res, next)=> {
    Skill.find().then((data)=>{
        res.json(data);
    })
});
router.delete('/:id',(req,res)=>{
    Skill.findByIdAndRemove(req.params.id).then((data)=>{
        res.json(data);
    });
});
router.put('/:id',(req,res)=>{
    Skill.findByIdAndUpdate(req.params.id,req.body).exec((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
});
module.exports = router;
