const express = require('express');
const router = express.Router();

// const { authCtrl } = require('../controller');

// const { userValidation } = require('../schemas');
// const { authentication, upload } = require('../middlewares');
// const { validateBody } = require('../helpers');

// const { userRegisterShema, emailShema, userLoginShema, userUpdateShema } =
//   userValidation;
// ============= всі оголошення
router.get('/notices');

// ============ створити ендпоінт для пошуку оголошеннь по заголовку
router.get('/notices/:q');

// ============ створити ендпоінт для отримання оголошень по категоріям
router.get('/notices/:categoryName');

// ============ створити ендпоінт для отримання одного оголошення
router.get('/notices/:id');

// ============ створити ендпоінт для додавання оголошення до обраних
router.get('/notices');

// ============ створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані
router.patch('/notices/:id/favorite');

// ============ створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних
router.delete('/notices/:id/favorite');

// ============ створити ендпоінт для додавання оголошень відповідно до обраної категорії
router.post('/notices');

// ============ створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем

// ============ створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем

// ================== Рендер списку оголошень з продажу
// router.get('/notices/sell', noticesCtrl.sell);

// router.post('/notices/lost-found');

// router.post('/notices/for-free');

// router.post('/register', validateBody(userRegisterShema), authCtrl.register);

// router.get('/verify/:verifycationToken', authCtrl.verify);

// router.post('/verify', validateBody(emailShema), authCtrl.reVerify);

// router.post('/login', validateBody(userLoginShema), authCtrl.login);

// router.get('/current', authentication, authCtrl.current);

// router.patch(
//   '/update',
//   authentication,
//   validateBody(userUpdateShema),
//   authCtrl.update
// );

// router.post('/logout', authentication, authCtrl.logout);

// router.patch(
//   '/avatars',
//   authentication,
//   // upload.single('avatar'),
//   authCtrl.updateAvatar
// );

module.exports = router;
