var express = require('express');
var router = express.Router();
var Ctrl = require('../controllers/reservation.controller');

router.post('/result/:id', Ctrl.updateScore);
router.post('/', Ctrl.add);
router.put('/:id', Ctrl.update);
router.delete('/:id', Ctrl.delete)
router.get('/', Ctrl.getAll);
router.get('/last/:user',Ctrl.getLast);
router.get('/:user', Ctrl.getByUser);
module.exports = router;
