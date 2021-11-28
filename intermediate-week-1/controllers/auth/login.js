const User = require('./../../models/User')
const appError = require('./../../error/appError')
const jwt = require('jsonwebtoken')


const signToken = id =>{
  return token = jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:  process.env.JWT_EXPIRES})

}


const createSendToken =(user) => {
  const accessToken = signToken(user._id)
  return accessToken
}
const login = async (req, res, next) => {

  try{


    const {email,password} = req.body;
    const user = await User.findOne({email}).select('+password')
    const isMatch = await user.compareSecurePassword(password);
    
    if(!isMatch){
      throw new appError('Wrong email or password', 400)
    }
  

      const accessToken = createSendToken(user)
      const refreshToken = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET)
      

      res.status(201).json({
        message:'login successful',
        accessToken, refreshToken
      });
    

  }catch(err){
    next(err)
  }


};
module.exports = login;
