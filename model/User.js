const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        trim: true,
        unique: [true, 'Email is in use'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    phoneNumber: {
        type: Number,
        unique: [true, 'Phone number in use'],
        required: [true, 'Please enter Phone Number'],  
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        trim: true,
    },
    roles:{
        type: [String],
        default: ['user']
    },
    photo: {
        type: String
    }
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password)
}

UserSchema.methods.createAccessJWT = function(){
    return jwt.sign({userId: this._id, name: this.name}, 
        process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'})
}
UserSchema.methods.createRefreshJWT = function(){
    return jwt.sign({userId: this._id, name: this.name}, 
        process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
}
module.exports = mongoose.model('User', UserSchema)