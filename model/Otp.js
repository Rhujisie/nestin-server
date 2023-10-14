const mongoose = require('mongoose')
const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number, 
        required: true
    },
    createdAt: { type: Date, expires: '5m', default: Date.now } 
})

module.exports = mongoose.model('OTP', OtpSchema)