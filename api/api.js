var express = require('express');
var path = require('path');
var router = express.Router();
var user = require('../routes/user');
var skill = require('../routes/skill');
var category = require('../routes/category');
var scenario = require('../routes/scenario');
var review = require('../routes/review');
var reservation = require('../routes/reservation');

/* GET home page. */
router.use('/user', user);
router.use('/skill',skill);
router.use('/category',category);
router.use('/scenario',scenario);
router.use('/review',review);
router.use('/reservation',reservation);
router.post('/upload', function(req, res) {
    if (!req.files){
        return res.status(400).json({data:'No files were uploaded'});
    }
    let sampleFile = req.files.file;

    let str = sampleFile.mimetype.split('/');
    let name = new Date().valueOf()+'.'+str[1];
    if(str[0]=='image'){
        sampleFile.mv(path.join(__dirname, '../public/assets/img/uploads/'+name), function(err) {
            if (err)
                return res.status(500).json(err);
            res.json({name:name});
        });
    }
    else {
        res.status(400).json({data:'unacceptable format'});
    }
});
module.exports = router;
