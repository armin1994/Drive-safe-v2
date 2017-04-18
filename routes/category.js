var express = require('express');
var router = express.Router();
var Ctrl = require('../controllers/categories.controller');
/* GET home page. */

router.post('/', Ctrl.add);
router.get('/', Ctrl.getAll);
router.delete('/:id',Ctrl.delete);
router.put('/:id', Ctrl.update);
module.exports = router;
