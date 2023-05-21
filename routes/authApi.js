const express = require('express');
const router = express.Router();

const { authCtrl } = require('../controller');

const { userValidation } = require('../schemas');
const { authentication, imageUpload, passport } = require('../middlewares');
const { validateBody } = require('../helpers');

const { userRegisterShema, emailShema, userLoginShema, userUpdateShema } =
  userValidation;

router.post('/register', validateBody(userRegisterShema), authCtrl.register);

// router.get('/verify/:verifycationToken', authCtrl.verify);

// router.post('/verify', validateBody(emailShema), authCtrl.reVerify);

router.post('/login', validateBody(userLoginShema), authCtrl.login);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  authCtrl.googleAuth
);

router.get('/current', authentication, authCtrl.current);

router.patch(
  '/update',
  authentication,
  validateBody(userUpdateShema),
  authCtrl.update
);

router.post('/logout', authentication, authCtrl.logout);

router.patch(
  '/avatars',
  authentication,
  imageUpload.single('avatar'),
  authCtrl.updateAvatar
);

module.exports = router;
