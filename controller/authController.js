const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

require('dotenv').config();

const { User } = require('../schemas');
const {
  httpError,
  ctrlWrapper,
  resizeImage,
  sendEmail,
} = require('../helpers');
const HttpError = require('../helpers/httpError');
const { SECRET, BASE_URL } = process.env;
const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

/**
 * ============================ Регистрация пользователя
 */
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, `Email in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);

  const verifycationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
    verifycationToken,
  });

  const verifycationEmail = {
    to: email,
    subject: 'Verifycation email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verifycationToken}" >Click here to verify your email</a>`,
  };

  await sendEmail(verifycationEmail);

  res.status(201).json({
    email: newUser.email,
  });
};

// /**
//  * ============================ Верификация пользователя
//  */
// const verify = async (req, res) => {
//   const { verifycationToken } = req.params;

//   const user = await User.findOne({ verifycationToken });

//   if (!user) {
//     throw HttpError(404, 'User not found');
//   }

//   await User.findByIdAndUpdate(user._id, {
//     verify: true,
//     verifycationToken: null,
//   });

//   res.status(200).json({
//     message: `Verification successful`,
//   });
// };

// /**
//  * ============================ Повторная отсылка письма верификации пользователя
//  */
// const reVerify = async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     throw HttpError(404, 'Email not found');
//   }

//   if (user.verify) {
//     throw HttpError(400, 'Verification has already been passed');
//   }

//   const verifycationEmail = {
//     to: email,
//     subject: 'Verifycation email',
//     html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verifycationToken}">Click here to verify your email</a>`,
//   };

//   await sendEmail.nodemailer(verifycationEmail);

//   res.status(200).json({
//     message: `Verification email sent`,
//   });
// };

/**
 * ============================ Login пользователя
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw httpError(401, `Email or password is wrong`);
  }

  // if (!user.verify) {
  //   throw httpError(401, `Email not veryfi`);
  // }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw httpError(401, `Email or password is wrong`);
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    birthday: user.birthday,
    phone: user.phone,
    city: user.city,
    avatarUrl: user.avatarUrl,
    pets: user.pets,
    notices: user.notices,
    verify: user.verify,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '23h' });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: payload,
  });
};

/**
 * ============================ Текущий пользователь
 */
const getCurrentUser = async (req, res) => {
  const {
    _id,
    name,
    email,
    birthday,
    phone,
    city,
    avatarUrl,
    pets,
    notices,
    verify,
  } = req.user;

  res.status(200).json({
    _id,
    name,
    email,
    birthday,
    phone,
    city,
    avatarUrl,
    pets,
    notices,
    verify,
  });
};

/**
 * ============================ Обновление профиля пользователя
 */
const userUpdate = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
    fields: {
      token: 0,
      password: 0,
      verifycationToken: 0,
      createdAt: 0,
      updatedAt: 0,
    },
  });

  res.status(200).json(result);
};

/**
 * ============================ Logout пользователя
 */
const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(200).json({ message: `Successfully logout` });
};

/**
 * ============================ Обновление аватарки пользователя
 */
const updateAvatar = async (req, res) => {
  // const { _id } = req.user;

  // const { path: tempUpload, filename } = req.file;

  // const avatarName = `${_id}_${filename}`;
  // const resultUpload = path.join(avatarsDir, avatarName);

  // await resizeImage(tempUpload, 250, 250);

  // await fs.rename(tempUpload, resultUpload);
  // const avatarUrl = path.join('avatars', avatarName);

  // await User.findByIdAndUpdate(_id, { avatarUrl });

  res.status(200).json({
    // avatarUrl,
    message: `Avatar successfully changed`,
  });
};

module.exports = {
  register: ctrlWrapper(registerUser),
  // verify: ctrlWrapper(verify),
  // reVerify: ctrlWrapper(reVerify),
  login: ctrlWrapper(loginUser),
  current: ctrlWrapper(getCurrentUser),
  update: ctrlWrapper(userUpdate),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
