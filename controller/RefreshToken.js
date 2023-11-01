const User = require('../model/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')
require('dotenv').config()

const handleRefreshToken = async (req, res)=>{
    const {jwt:refreshToken} = req.cookies
    console.log('refresh', jwt)
    if(!jwt) throw new UnauthenticatedError(`Authorization invalid ${jwt}`)
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded)=>{
            if(err) {
                console.log('refreshToken',err)
                return res.status(403).json(err)
            }
            const accessToken = jwt.sign(
                {userId: decoded.userId, 
                name: decoded.name
                }, 
                process.env.ACCESS_TOKEN_SECRET, {expiresIn:'5m'}
            )
            const user = await User.findById(decoded.userId).select('-password')
            return res.json({accessToken, roles: user.roles, name: user.name})
        }
    )
}
module.exports = handleRefreshToken