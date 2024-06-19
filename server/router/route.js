import { Router } from 'express';
import * as controller from '../controllers/appController.js';
const router = Router();

// PosT

router.post('/register', controller.register);

router.post('/registerMail', (req, res) => {
  res.status(201).json({
    message: 'register Email route',
  });
});

router.post('/authenticate', (req, res) => {
  res.status(201).json({
    message: 'authenticate',
  });
});

router.post('/login', controller.login);

//  GET Method

router.get('/user/:username', controller.getUser);

router.get('/generateOTP', controller.generateOTP);

router.get('/verifyOTP', controller.verfiyOTP);

router.get('/createResetSession', controller.createResetSession);

// PuT

router.put('/updateuser', controller.updateuser);
router.put('/resetPassword', controller.resetPassword);

export default router;
