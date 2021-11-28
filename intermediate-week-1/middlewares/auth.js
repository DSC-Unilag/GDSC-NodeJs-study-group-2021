const appError = require('./../error/appError')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const User = require('./../models/User')



exports.requireSignIn = async (req, res, next) => {

  try{
    const authorization = req.headers.authorization;
    const [bearer, token] = authorization.split(' ');
    if(!token){
        next(new appError('You are not logged in, log in for access', 401))
    }

    const decoded =  jwt.verify(token, process.env.JWT_SECRET)

    const currentUser = await User.findById(decoded.id)

    if(!currentUser){
        return next(new appError('The user no longer exists', 401))
    }
    
    
    req.user = currentUser
    next()

  }catch(err){
    next(err)
  }
    /**
   * veify the token and verify if user is logged in in or not
   * If user is logged in then call the next() function to go to the next middleware
   */
};
