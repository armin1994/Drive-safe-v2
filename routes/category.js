var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Category = models.category;
/* GET home page. */

router.post('/', (req, res, next)=> {
    var temp = new Category(req.body);
    temp.save((data)=>{
        res.json({});
    })
});
router.get('/', (req, res, next)=> {
    Category.find().then((data)=>{
        res.json(data);
    })
});

module.exports = router;
