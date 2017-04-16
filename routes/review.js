var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Review = models.review;
/* GET home page. */

router.post('/', (req, res, next)=> {
    var temp = new Review(req.body);
    temp.save((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
});
router.get('/', (req, res, next)=> {
    Review.find().populate('user').then((data)=>{
        res.json(data);
    })
});
router.get('/:id', (req, res, next)=> {
    Review.find({scenario:req.params.id}).populate('user').then((data)=>{
        res.json(data);
    })
});
router.delete('/:id',(req,res)=>{
    Review.findByIdAndRemove(req.params.id).then((data)=>{
        res.json(data);
    });
});
router.put('/:id',(req,res)=>{
    Review.findByIdAndUpdate(req.params.id,req.body).exec((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
});

module.exports = router;
