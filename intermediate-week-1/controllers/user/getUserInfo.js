const User = require('./../../models/User')

const getUserInfo = async (req, res, next) => {
  const user = await User.findById(req.user._id, 'firstName lastName email')
  
  res.status(200).json(
    user
  )
};

module.exports = getUserInfo;
