var express = require('express');
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
    if (!req.files)
        return res.status(400).json({data:'No files were uploaded'});

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('/public/assets/img/filename.jpg', function(err) {
        if (err)
            return res.status(500).send(err);
        res.send({msg:'File uploaded!'});
    });
});
module.exports = router;
