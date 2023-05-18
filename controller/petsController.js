const { Pet } = require('../schemas');

const { ctrlWrapper, httpError } = require('../helpers');

const addPet = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Pet.create({
    ...req.body,
    owner,
    petsImage: req.file.path,
  });

  if (!result) {
    throw httpError(404);
  }

  res.status(201).json(result);
};

const deletePet = async (req, res) => {
  const { id } = req.params;

  const result = await Pet.findByIdAndDelete(id);

  if (!result) {
    throw httpError(404);
  }

  res.status(200).json({ message: 'Delete success' });
};

const getUserAndPets = async (req, res) => {
  const {
    _id,
    name,
    email,
    birthday,
    phone,
    city,
    avatarUrl,
    favorite,
    verify,
  } = req.user;

  const pets = await Pet.find({ owner: _id }, '-createdAt -updatedAt -owner');

  const user = {
    _id,
    name,
    email,
    birthday,
    phone,
    city,
    avatarUrl,
    favorite,
    verify,
  };

  res.json({ user, pets });
};

module.exports = {
  getUserAndPets: ctrlWrapper(getUserAndPets),
  addPet: ctrlWrapper(addPet),
  deletePet: ctrlWrapper(deletePet),
};
