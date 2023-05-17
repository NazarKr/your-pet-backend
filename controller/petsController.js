const { Pet } = require('../schemas');

const { ctrlWrapper, HttpError } = require('../helpers');

// const getUserAndPets = async (req, res) => {
//   const { name, email, birthday, phone, city, avatarUrl } = req.user;

//   const result = await User.find({ pet }, '-createdAt -updatedAt', {
//     skip,
//     limit,
//   }).populate('owner', 'name email');
//   res.json(result);

//
// };

const addPet = async (req, res) => {
  // const { _id: owner } = req.user;
  console.log(req.body);

  // const result = await Pet.create({
  //   ...req.body,
  //   owner,
  //   petsImage: req.file.path,
  // });

  // if (!result) {
  //   throw httpError(404, `Result not found`);
  // }

  res.status(201).json('result');
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
  // getUserAndPets: ctrlWrapper(getUserAndPets),
  addPet: ctrlWrapper(addPet),
  deletePet: ctrlWrapper(deletePet),
};
