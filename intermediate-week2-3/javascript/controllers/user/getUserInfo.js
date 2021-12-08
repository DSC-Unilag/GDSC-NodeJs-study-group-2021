const getUserInfo = async (req, res, next) => {
  //gets info about the logged in user
  /**
   * return a response in the form
   * {
   *      firstName:**************,
   *      lastName: **************,
   *      email: *****************
   * }
   */
  const { firstName, lastName, email } = req.user;

  return res.status(200).json({
    firstName,
    lastName,
    email,
  });
};

module.exports = getUserInfo;
