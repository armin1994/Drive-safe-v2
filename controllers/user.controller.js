var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var models = require('../models/models');
var User = models.user;

module.exports.fb = (req, res) => {
    User.findOne({fb_id: req.params.id}).then((data) => {
        if (data) {
            var token = jwt.sign({user_name: data.user_name}, 'armin');
            res.json({status: true, user: data, token: token});
        }
        res.json({status: false});
    });
}

module.exports.register = (req, res, next) => {
    var temp = new User(req.body);
    temp.password = bcrypt.hashSync(temp.password);
    temp.save((err, data) => {
        if (err)
            res.json({status: false});
        else
            res.json({status: true,data:data});
    })
}

module.exports.login = (req, res, next) => {
    User.findOne({user_name: req.body.user_name}).then((data) => {
        if (bcrypt.compareSync(req.body.password, data.password)) {
            var token = jwt.sign({user_name: data.user_name}, 'armin');
            res.json({status: true, user: data, token: token});
        }
        else
            res.json({status: false});
    }).catch((err) => {
        res.json({status: false});
    });
}

module.exports.getAll = (req, res, next) => {
    User.find().then((data) => {
        res.json(data);
    })
}

module.exports.delete = (req,res)=>{
    User.findByIdAndRemove(req.params.id).then((data)=>{
        res.json(data);
    });
}

module.exports.update = (req, res) => {
    if (req.body.password)
        req.body.password = bcrypt.hashSync(req.body.password);
    User.findByIdAndUpdate(req.params.id, req.body).then((data) => {
        res.json(data);
    });
}
