var models = require('../models/models');
var Skill = models.skill;

module.exports.getAll = (req, res)=> {
    Skill.find().then((data)=>{
        res.json(data);
    })
}

module.exports.add = (req, res, next)=> {
    var temp = new Skill(req.body);
    temp.save((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
}

module.exports.delete = (req,res)=>{
    Skill.findByIdAndRemove(req.params.id).then((data)=>{
        res.json(data);
    });
}

module.exports.update = (req,res)=>{
    Skill.findByIdAndUpdate(req.params.id,req.body).exec((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
}