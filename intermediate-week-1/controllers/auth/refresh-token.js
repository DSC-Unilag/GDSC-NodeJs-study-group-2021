const jwt = require('jsonwebtoken')


const signToken = id =>{
   return token = jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:  process.env.JWT_EXPIRES})
 
 }
 
 const createSendToken =(user) => {
   const accessToken = signToken(user._id)
   return accessToken
 }
const refreshAccessToken = async (req, res, next) => {
  /**
     * Takes a parameter 
     * refreshToken 
     * in the body of the request. 
     * 
     * Take that refresh token and send a return a response with a valid access code for that user
     * 
     * response format
     * {
     *       accessToken: **********,
        refreshToken: *********
     * }
     */
      const {refreshToken} = req.body;
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
         if(err) return res.sendStatus(403)
         const accessToken = createSendToken(user)
         res.status(200).json({
            accessToken,
            refreshToken     
         })
      })

      
   };

module.exports = refreshAccessToken;
