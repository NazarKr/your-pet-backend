const { Pet } = require('../schemas');
const { ctrlWrapper, HttpError } = require('../helpers');

const addPet = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Pet.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deletePet = async (req, res) => {
  const { id } = req.params;
  const result = await Pet.findByIdAndDelete(id);
  console.log(result);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json({ message: 'Delete success' });
};

module.exports = {
  addPet: ctrlWrapper(addPet),
  deletePet: ctrlWrapper(deletePet),
};
