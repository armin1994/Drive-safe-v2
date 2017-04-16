var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Reservation = models.reservation;
var Scenario = models.scenario;
/* GET home page. */
var Mongoose = require('mongoose');
var ObjectId = Mongoose.Types.ObjectId;
router.post('/', (req, res, next) => {
    var temp = new Reservation(req.body);
    var promises = temp.scenarios.map(s => {
            return new Promise((resolve, reject) => {
                Scenario.findOne(s.scenario).then((d) => {
                        d.skills.map(x => {
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
        temp.save((err,data) => {
            if(err)
                res.json(err);
            res.json(data);
        })
    })

});
router.put('/result/:id', (req, res) => {
    Reservation.findById(req.params.id).exec((err,data)=>{
        if(err)
            res.json(err);
        else {
            var skillsScore = 0;
            var nbSkills = 1;
            var nbScenarios = 1;
            var finished = 0;
            if(data.scenarios){
                nbScenarios = data.scenarios.length;
                data.scenarios.forEach(x=>{
                    if(x.scenario == req.body.scenario){
                        ngSkills = x.skills.length;
                        x.skills.forEach(xx=>{
                            if(xx.skill==req.body.skill)
                                xx.score = req.body.score;
                            skillsScore+=xx.score;
                        });
                        if((skillsScore/nbSkills)>=50)
                            x.status = 1;
                        else
                            x.status = 2;
                    }
                    if (x.status!=0)
                        finished+=1;
                });
                if((finished/nbScenarios)==1)
                    data.status = true;
            }
            data.save();
            res.json(data);
        }
    });
});
router.put('/:id', (req, res) => {
    Reservation.findByIdAndUpdate(req.params.id, req.body).then((data) => {
        res.json(data);
    })
});
router.delete('/:id', (req, res) => {
    Reservation.findByIdAndRemove(req.params.id).then((data) => {
        res.json(data);
    })
})
router.get('/', (req, res, next) => {
    Reservation.find().populate('scenarios.scenario').then((data) => {
        res.json(data);
    })
});

router.get('/:user', (req, res) => {
    Reservation.find({user: req.params.user}).populate('scenarios.scenario scenarios.skills.skill').then((data) => {
        res.json(data);
    })
});
module.exports = router;
