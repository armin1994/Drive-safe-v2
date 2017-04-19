var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
fileUpload = require('express-fileupload');
var api = require('./api/api');
var cors = require('cors');
var app = express();
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use('/api', expressJwt({secret: 'armin'}).unless({path: ['/api/user/login', '/api/user/register',/\/api\/user\/fb/i]}), api);
app.get('/admin', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/admin/index.html'));
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error: 'unauthorized user'});
    }
});
module.exports = app;
