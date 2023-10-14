const mongoose = require('mongoose')
const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter description'],
        trim: true
    },
    type:{
        type: String,
        required: [true, 'Please enter type'],
        trim: true
    },
    district: {
        type: String,
        required: [true, 'Please enter district'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'Please enter city'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Please enter address'],
        trim: true
    },
    landmark: {
        type: String,
        required: [true, 'Please enter landmark'],
        trim: true
    },
    bedroom: {
        type: Number,
        default: 1,
        trim: true
    },
    livingroom: {
        type: Number,
        default: 0,
        trim: true
    },
    kitchen: {
        type: Number,
        default: 0,
        trim: true
    },
    washroom: {
        type: Number,
        default: 1,
        trim: true
    },
    photos:{
        type: [String],
    },
    amenities:{
        type: [String]
    },
    rules:{
        type: [String]
    },
    price:{
        type: Number,
        required: [true, 'Please enter a price']
    },
    deposit:{
        type: Number,
    }
    ,
    points:{
        type: Number,
        default: 0,
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    avail:{
        type: Boolean,
        default: true
    }
},{timestamps: true})

module.exports = mongoose.model('Place', PlaceSchema)