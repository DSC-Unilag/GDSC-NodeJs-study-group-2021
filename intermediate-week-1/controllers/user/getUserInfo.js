const User = require('../../models/User');

const getUserInfo = async (req, res, next) => {
  //gets info about the logged in user
  try {
    const users = await User.find({}).select('-_id -password -createdAt -updatedAt -__v');

    if (!users) {
      return res.sendApiError({
        status: 404,
        title: 'Missing data!',
        detail: 'No user found',
      });
    }
    return res.json(users);
  } catch (error) {
    return res.mongoError(error);
  }

  /**
   * return a response in the form
   * {
   *      firstName:**************,
   *      lastName: **************,
   *      email: *****************
   * }
   */
};

module.exports = getUserInfo;
