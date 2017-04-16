var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Scenario = models.scenario;
var Reservation = models.reservation;
var Mongoose = require('mongoose');
var ObjectId = Mongoose.Types.ObjectId;
/* GET home page. */

router.post('/', (req, res, next) => {
    var temp = new Scenario(req.body);
    temp.save((data) => {
        res.json(data);
    })
});
router.put('/:id', (req, res) => {
    Scenario.findByIdAndUpdate(req.params.id, req.body).then((data) => {
        res.json(data);
    })
})
router.get('/', (req, res, next) => {
    Scenario.find().populate('skills category').then((data) => {
        res.json(data);
    });
});
router.get('/success-rate/:id', (req, res) => {
    Reservation.find({'scenarios.scenario':new ObjectId(req.params.id)},{ "scenarios.$": 1 }).exec((err, data) => {
        if (err)
            res.json(err);
        else {
            var success = 0 ;
            var all = data.length;
            if (data.length>0){
            data.forEach(x=> {
                if (x.scenarios[0].status==1)
                    success++;
                else if (x.scenarios[0].status==0)
                    all--;
            });
            var rate = (success/all)*100;
            res.json({rate:rate});
            } else
                res.json({rate:0});
        }
    })
});
router.get('/:id', (req, res, next) => {
    Scenario.findById(req.params.id).populate('skills category').then((data) => {
        res.json(data);
    });
});
router.delete('/:id',(req,res)=>{
    Skill.findByIdAndRemove(req.params.id).then((data)=>{
        res.json(data);
    });
});
module.exports = router;
