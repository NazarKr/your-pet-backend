const express = require('express');
const router = express.Router();

const { authCtrl } = require('../controller');

const { userValidation } = require('../schemas');
const { authentication, upload } = require('../middlewares');
const { validateBody } = require('../helpers');

const { userRegisterShema, emailShema, userLoginShema, refreshShema } =
  userValidation;

router.post('/register', validateBody(userRegisterShema), authCtrl.register);

// router.get('/verify/:verifycationToken', authCtrl.verify);

// router.post('/verify', validateBody(emailShema), authCtrl.reVerify);

router.post('/login', validateBody(userLoginShema), authCtrl.login);

router.post('/refresh', validateBody(refreshShema), authCtrl.refresh);

router.get('/current', authentication, authCtrl.current);

router.patch('/update', authentication, authCtrl.update);

router.post('/logout', authentication, authCtrl.logout);

router.patch(
  '/avatars',
  authentication,
  // upload.single('avatar'),
  authCtrl.updateAvatar
);

module.exports = router;
