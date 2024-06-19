/// Register Controller POST
const register = async (req, res) => {
  res.json('Register Route');
};

/// Login Controller POST
const login = async (req, res) => {};

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
