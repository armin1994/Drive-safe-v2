var express = require('express');
var router = express.Router();
var Ctrl = require('../controllers/user.controller')

/* GET home page. */
router.get('/fb/:id', Ctrl.fb);
router.post('/login', Ctrl.login);
router.put('/:id', Ctrl.update);
router.post('/register', Ctrl.register);

router.get('/', Ctrl.getAll);
router.delete('/:id', Ctrl.delete);


module.exports = router;
