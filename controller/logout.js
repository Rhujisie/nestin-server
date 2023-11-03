const logout  = async(req, res)=>{
    const {jwt: refreshToken} = req.cookies
    if(!refreshToken) return res.sendStatus(204)
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }
    ) 
    res.sendStatus(204)
}
module.exports = {logout}