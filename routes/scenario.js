var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Scenario = models.scenario;
/* GET home page. */

router.post('/', (req, res, next)=> {
    var temp = new Scenario(req.body);
    temp.save((data)=>{
        res.json(data);
    })
});
router.put('/:id',(req,res)=>{
    Scenario.findByIdAndUpdate(req.params.id,req.body).then((data)=>{
        res.json(data);
    })
})
router.get('/', (req, res, next)=> {
    Scenario.find().populate('skills category').then((data)=>{
        res.json(data);
    });
});
router.get('/:id', (req, res, next)=> {
    Scenario.findById(req.params.id).populate('skills category').then((data)=>{
        res.json(data);
    });
});

module.exports = router;
