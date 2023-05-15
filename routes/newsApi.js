const express = require('express');
const router = express.Router();

const { newsCtrl } = require('../controller');

router.get('/', newsCtrl.getAll);
router.get('/find', newsCtrl.find);

module.exports = router;
