import JWT from 'jsonwebtoken';

const SecreateKEY =
  '7vgfPTuueXy+JH4&VzmQyeW8PVF$%DpunZyyRhqpj$AkERjS7srT*Sz564RFVjBJ+#z5a$$xK?c$fkkskfUc@pWz29A3@r6@URJF';

const Auth = async (req, res, next) => {
  try {
    // access Authrorize Header
    const BeareToken = req.headers.authorization.split(' ')[1];

    const decodedToken = await JWT.verify(BeareToken, SecreateKEY);
    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({
      error: 'Authentication Falid..!',
    });
  }
};

// ===== Local variables

export function LocalVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };

  next();
}

export default Auth;
