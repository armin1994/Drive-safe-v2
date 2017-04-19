var models = require('../models/models');
var Scenario = models.scenario;
var Reservation = models.reservation;
var Mongoose = require('mongoose');
var ObjectId = Mongoose.Types.ObjectId;

module.exports.getAll = (req, res)=> {
    Scenario.find().populate('skills category').then((data)=>{
        res.json(data);
    })
}

module.exports.get = (req, res, next) => {
    Scenario.findById(req.params.id).populate('skills category').then((data) => {
        res.json(data);
    });
}

module.exports.add = (req, res, next) => {
    var temp = new Scenario(req.body);
    temp.save((err,data) => {
        if(err)
            res.json(err);
        res.json(data);
    });
}

module.exports.delete = (req,res)=>{
    Scenario.findByIdAndRemove(req.params.id).then((data)=>{
        res.json(data);
    });
}

module.exports.update = (req,res)=>{
    Scenario.findByIdAndUpdate(req.params.id,req.body).exec((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
}

module.exports.rate = (req, res) => {
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
}
