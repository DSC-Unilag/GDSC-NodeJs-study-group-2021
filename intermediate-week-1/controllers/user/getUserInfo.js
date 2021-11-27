const User = require('../../models/User');

const getUserInfo = async (req, res, next) => {
  //gets info about the logged in user
  try {
    const { firstName, lastName, email } = res.user;

    return res.json({
      firstName,
      lastName,
      email,
    });
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
