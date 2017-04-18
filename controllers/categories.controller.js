var models = require('../models/models');
var Category = models.category;

module.exports.add = (req, res, next)=> {
    var temp = new Category(req.body);
    temp.save((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
}

module.exports.getAll = (req, res, next)=> {
    Category.find().then((data)=>{
        res.json(data);
    })
}

module.exports.delete = (req,res)=>{
    Category.findByIdAndRemove(req.params.id).then((data)=>{
        res.json(data);
    });
}

module.exports.update = (req,res)=>{
    Category.findByIdAndUpdate(req.params.id,req.body).exec((err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    })
}
