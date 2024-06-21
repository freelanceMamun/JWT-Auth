import { Users } from '../models/User.model.js';
const userVerify = async (req, res, next) => {
  try {
    const { username } = req.method == 'GET' ? req.query : req.body;

    /// check the user
    let exist = await Users.findOne({ username });
    console.log(exist);

    if (!exist) return res.status(404).json({ error: "Cant't find User!" });

    next();
  } catch (error) {
    res.status(404).json({ error: 'Authentication Error' });
  }
};

export { userVerify };
