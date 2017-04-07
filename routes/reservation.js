var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Reservation = models.reservation;
var Scenario = models.scenario;
/* GET home page. */

router.post('/', (req, res, next) => {
    var temp = new Reservation(req.body);
    var promises = temp.scenarios.map(s => {
            return new Promise((resolve, reject) => {
                Scenario.findOne(s.scenario).then((d) => {
                        d.skills.map(x=>{
                            var skillScore = {};
                            skillScore.skill = x;
                            s.skills.push(skillScore);
                            resolve({skills: d.skills})
                        })
                    }
                )
            })
        }
    );
    Promise.all(promises).then((d) => {
        temp.save((data) => {
            res.json(data);
        })
    })

});
router.put('/:id',(req,res)=>{
    Reservation.findByIdAndUpdate(req.params.id,req.body).then((data)=>{
        res.json(data);
    })
});
router.delete('/:id',(req,res)=>{
    Reservation.findByIdAndRemove(req.params.id).then((data)=>{
        res.json(data);
    })
})
router.get('/', (req, res, next) => {
    Reservation.find().populate('scenarios.scenario').then((data) => {
        res.json(data);
    })
});
router.get('/:user',(req,res)=>{
    Reservation.find({user:req.params.user}).populate('scenarios.scenario scenarios.skills.skill').then((data)=>{
        res.json(data);
    })
})
module.exports = router;
