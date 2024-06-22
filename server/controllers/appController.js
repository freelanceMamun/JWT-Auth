import { Users } from '../models/User.model.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

import OTPGenerator from 'otp-generator';

const SecreateKEY =
  '7vgfPTuueXy+JH4&VzmQyeW8PVF$%DpunZyyRhqpj$AkERjS7srT*Sz564RFVjBJ+#z5a$$xK?c$fkkskfUc@pWz29A3@r6@URJF';

export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == 'GET' ? req.query : req.body;

    // check the user existance
    let exist = await Users.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: 'Authentication Error' });
  }
}

/// Register Controller POST
const register = async (req, res) => {
  try {
    const { username, password, profile, email } = req.body;

    /// Check the Existing UserName or email
    const CheckUser = await Users.findOne({ username });
    const CheckEmail = await Users.findOne({ email });

    if (CheckUser) {
      res.status(500).send({
        message: 'Please Use Unique Username',
      });
    }
    if (CheckEmail) {
      res.status(500).send({
        message: 'Please Use Unique Email',
      });
    }

    // Set password bcrypt
    const salt = await bcrypt.genSalt(10);
    const hasehPassword = await bcrypt.hash(password, salt);
    console.log(hasehPassword);

    // Set new  user
    const user = new Users({
      email: email,
      password: hasehPassword,
      username: username,
      profile: profile || '',
    });

    await user.save();

    return res.status(201).json({
      message: 'User Register Successfully!',
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

/// Login Controller POST
const login = async (req, res) => {
  // Get Data Body
  const { username, password } = req.body;
  try {
    const findUser = await Users.findOne({ username });

    // ==== Check uers

    if (!findUser) {
      res.status(40).json({
        error: 'Invalid Credential',
      });
    }

    /// check the password

    const isMatchPassword = await bcrypt.compare(password, findUser.password);

    // === check user password

    if (!isMatchPassword) {
      return res.status(404).json({
        error: 'Invalid Credential',
      });
    }

    // Successfull login user

    // === Generateuser Loken

    if (findUser) {
      const payloadUser = {
        AWU: findUser.username,
        UserId: findUser._id,
      };
      // GET Token JWT Generate user id
      let TokenJWT = JWT.sign(payloadUser, SecreateKEY, { expiresIn: '24h' });

      res.status(200).send({
        message: 'Login Successfully!',
        findUser,
        TokenJWT,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Login Unauthorized',
    });
  }
};

// Get User Controllers

const getUser = async (req, res) => {
  const { username } = req.params;

  // GET User

  try {
    if (!username) {
      return res.status(501).send({ error: 'Invalid  Username..!' });
    }
    const FindUser = await Users.findOne({ username });

    if (!FindUser) {
      return res.status(501).send({ error: "Couldn't Find the User...!" });
    } else {
      const { password, ...response } = Object.assign({}, FindUser.toJSON());
      return res.status(201).send({ response, password });
    }
  } catch (error) {
    return res.status(404).send({ error: 'Cannot Find User Data..!' });
  }
};

// PUT Update user

const updateuser = async (req, res) => {
  try {
    const Id = req.query.id;
    const { UserId } = req.user;
    console.log('id', UserId);

    if (UserId) {
      const body = req.body;

      await Users.updateOne({ _id: UserId }, body);

      return res.status(201).send({
        mesg: 'Record Updated',
      });
    } else {
      return res.status(401).send({ error: 'User Not Found...!' });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
};

/// GET Generate oTP

const generateOTP = async (req, res) => {
  req.app.locals.OTP = await OTPGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
};

/// GET Verify OTP

const verfiyOTP = async (req, res) => {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ msg: 'Verify Successsfully!' });
  }
  return res.status(400).send({ error: 'Invalid OTP' });
};

/// Reset Sesstion

const createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).send({ mesg: 'access grantend' });
  }

  res.status(403).send({ error: 'Session Expired..!' });
};

/// Reset Password
async function resetPassword(req, res) {
  const salt = await bcrypt.genSalt(10);

  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: 'Session expired!' });

    const { username, password } = req.body;

    const hasehPassword = await bcrypt.hash(password, salt);

    const findUser = await Users.findOne({ username });

    if (!findUser) {
      return res.status(401).send({ error: 'Username not Found..!' });
    } else {
      await Users.updateOne({ username }, { password: hasehPassword });
      req.app.locals.resetSession = false;
      res.status(201).json({
        message: 'Record Updated Sucessfully..!',
      });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

export {
  register,
  login,
  getUser,
  updateuser,
  verfiyOTP,
  generateOTP,
  createResetSession,
  resetPassword,
};
