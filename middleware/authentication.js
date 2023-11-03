const User = require('../model/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors/index')
const auth = async (req, res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authenticaion invalid')
    }
    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,)
        req.user = {userId: payload.userId, name: payload.name}
    }catch(err){
        res.status(403).json(err)
        return
    }   
    next()
}
module.exports = auth