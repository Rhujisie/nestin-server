const User = require('../model/User')
const getUser  = async(req, res)=>{
    const {userId} = req.user
    const user = await User.findById(userId).select('-password').lean()
    res.status(200).json(user)
}
const updateUser = async (req, res)=>{
    const {userId} = req.user
    const user = await User.findByIdAndUpdate(userId, req.body)
        .select('-password').lean()
    res.status(201).json(user)
}
module.exports = {getUser,updateUser}