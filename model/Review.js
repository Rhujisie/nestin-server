const mongoose  = require('mongoose')
const ReviewSchema = new mongoose.Schema({
        cleaniness:{
            type: Number
        },
        host:{
            type: Number
        },
        location:{
            type: Number
        },
        value:{
            type: Number
        },
        accuracy:{
            type: Number
        },
        review:{
            type: String
        },
        userID: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        placeID:{
            type: mongoose.Types.ObjectId,
            ref: 'Place',
            required: true,
        } 
    }
)

module.exports = mongoose.model('Review', ReviewSchema)