const express = require('express');
const router = express.Router();

const { partnersCtrl } = require('../controller');

router.get('/', partnersCtrl.getAll);

module.exports = router;
