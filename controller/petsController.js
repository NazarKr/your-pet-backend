const { Pet, User } = require('../schemas');

const { ctrlWrapper, HttpError } = require('../helpers');

const getUserAndPets = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Pet.find({ owner }, '-createdAt -updatedAt').populate(
    'owner',
    'name email birthday phone city avatarUrl'
  );
  res.json(result);
};

// const getUserAndPets = async (req, res) => {
//   const { _id } = req.user;

//   console.log(req.user);

//   const result = await User.findById(_id)
//     .populate({
//       path: 'pets',
//       model: Pet,

//     })
//     .exec();

//   // if (!result) {
//   //   throw httpError(404, `Result not found`);
//   // }

//   res.status(200).json(result);
// };

const addPet = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Pet.create({
    ...req.body,
    owner,
    petsImage: req.file.path,
  });

  if (!result) {
    throw httpError(404, `Result not found`);
  }

  res.status(201).json(result);

  console.log(res);
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
  getUserAndPets: ctrlWrapper(getUserAndPets),
  addPet: ctrlWrapper(addPet),
  deletePet: ctrlWrapper(deletePet),
};
