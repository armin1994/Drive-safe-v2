var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Skill = models.skill;
/* GET home page. */

router.post('/', (req, res, next)=> {
    var temp = new Skill(req.body);
    temp.save((err,data)=>{
        res.json(data);
    })
});
router.get('/', (req, res, next)=> {
    Skill.find().then((data)=>{
        res.json(data);
    })
});

module.exports = router;
