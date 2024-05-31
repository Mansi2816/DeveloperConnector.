const jwt = require('jsonwebtoken')
const config = require ('config')


module.exports = function(req,res,next ) {
    //get token from header 
    const token = req.header('x-auth-token')

    //check if not token
    if (!token) {
        return res.status(401).json({msg: "no token, authorisation denied"})
    }

//verify token 
try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
   //take the request object and assign the value to the user 
    req.user = decoded.user
    next ()

} catch (error) {
 res.status(401).json({msg: "token is not valid"})   
}
}