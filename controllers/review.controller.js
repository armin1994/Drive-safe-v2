var models = require('../models/models');
var Review = models.review;

module.exports.getAll = (req, res)=> {
    Review.find().populate('user scenario').then((data)=>{
        res.json(data);
    })
}

module.exports.get = (req, res, next)=> {
    Review.find({scenario:req.params.id}).populate('user scenario').then((data)=>{
        res.json(data);
    })
}

module.exports.add = (req, res, next)=> {
    var temp = new Review(req.body);
    temp.save((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
}

module.exports.delete = (req,res)=>{
    Review.findByIdAndRemove(req.params.id).then((data)=>{
        res.json(data);
    });
}

module.exports.update = (req,res)=>{
    Review.findByIdAndUpdate(req.params.id,req.body).exec((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
}
