var express = require('express');
var router = express.Router();
var Ctrl = require('../controllers/scenario.controller');
/* GET home page. */

router.post('/', Ctrl.add);
router.put('/:id', Ctrl.update)
router.get('/', Ctrl.getAll);
router.get('/success-rate/:id', Ctrl.rate);
router.get('/:id', Ctrl.get);
router.delete('/:id',Ctrl.delete);
module.exports = router;
