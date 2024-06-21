import { Users } from '../models/User.model.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

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

      res.status(200).json({
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

  res.status(200).json({
    message: 'Login Successfully..!',
  });
};

// Get User Controllers

const getUser = async (req, res) => {
  res.json('GET User Router');
};

// PUT Update user

const updateuser = async (req, res) => {
  res.json('PUT Updateuser Router');
};

/// GET Generate oTP

const generateOTP = async (req, res) => {
  res.json('GEt generateOTP Router');
};

/// GET Verify OTP

const verfiyOTP = async (req, res) => {
  res.json('GEt Verify OTP Router');
};

/// Reset Sesstion

const createResetSession = async (req, res) => {
  res.json('Create Reset Sesstion');
};

/// Reset Password
const resetPassword = async (req, res) => {
  res.json('Reset Password');
};

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
