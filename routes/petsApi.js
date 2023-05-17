const express = require('express');
const router = express.Router();

const { petsCtrl } = require('../controller');
const { petSchemas } = require('../schemas');
const { addPetSchema } = petSchemas;

const { authentication, isValidId, imageUpload } = require('../middlewares');
const { validateBody } = require('../helpers');

// router.get('/', authentication, petsCtrl.getUserAndPets);

router.post(
  '/',
  authentication,
  // validateBody(addPetSchema),
  // imageUpload.single('petsImage'),
  petsCtrl.addPet
);

router.delete('/:id', authentication, isValidId, petsCtrl.deletePet);

module.exports = router;
