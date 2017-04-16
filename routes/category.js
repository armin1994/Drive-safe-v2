var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Category = models.category;
/* GET home page. */

router.post('/', (req, res, next)=> {
    var temp = new Category(req.body);
    temp.save((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
});
router.get('/', (req, res, next)=> {
    Category.find().then((data)=>{
        res.json(data);
    })
});
router.delete('/:id',(req,res)=>{
    Category.findByIdAndRemove(req.params.id).then((data)=>{
        res.json(data);
    });
});
router.put('/:id',(req,res)=>{
    Category.findByIdAndUpdate(req.params.id,req.body).exec((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
});
module.exports = router;
