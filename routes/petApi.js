const express = require('express');
const router = express.Router();

const { petsCtrl } = require('../controller');
const { petSchemas } = require('../schemas');
const { addPetSchema } = petSchemas;

const { authentication, isValidId } = require('../middlewares');
const { validateBody } = require('../helpers');

router.post('/', authentication, validateBody(addPetSchema), petsCtrl.addPet);
router.delete('/:id', authentication, isValidId, petsCtrl.deletePet);

module.exports = router;
