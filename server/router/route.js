import { Router, json } from 'express';
import * as controller from '../controllers/appController.js';
import Auth, { LocalVariables } from '../middleware/Auth.js';

import { registerMail } from '../controllers/mailer.js';

const router = Router();

// PosT
router.post('/register', controller.register);

router.post('/registerMail', registerMail);

router.post('/authenticate', (req, res) => {
  res.status(201).json({
    message: 'authenticate',
  });
});

router.post('/login', controller.verifyUser, controller.login);

//  GET Method

router.get('/user/:username', controller.getUser);

router.get(
  '/generateOTP',
  controller.verifyUser,
  LocalVariables,
  controller.generateOTP
);

router.get('/verifyOTP', controller.verfiyOTP);

router.get('/createResetSession', controller.createResetSession);

// PuT

router.put('/updateuser', Auth, controller.updateuser);
router.put('/resetPassword', controller.verifyUser, controller.resetPassword);

export default router;
