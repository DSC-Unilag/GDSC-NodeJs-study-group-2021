const User = require('./../../models/User')
const jwt = require('jsonwebtoken')

const signToken = id =>{
  return token = jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:  process.env.JWT_EXPIRES})

}


const createSendToken =(user) => {
  const accessToken = signToken(user._id)
  return accessToken
}
const signup = async (req, res, next) => {
 try{
   
  const {firstName,
    lastName,
    email,
    password,
    passwordConfirm} = req.body
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm
    })
    const user = await newUser.save()
    
    const accessToken = createSendToken(user)
    const refreshToken = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET)
  
    res.status(201).json({
      message: 'Sign up successfully',
    });
  

 }catch(err){
   next(err)
 }


};

module.exports = signup;
