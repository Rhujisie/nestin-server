const Place = require('../model/Place')

const getPlace = async(req, res)=>{
    const {id} = req.params
    const place = await Place.findOne({_id: id}).lean()
    // .select('-userID').select('-_id').select('-__v')
    // .select('-createdAt').select('-updatedAt')
    res.status(200).json(place)
}

const getAllPlace = async(req, res)=>{
    const {userId} = req.user
    const place = await Place.find({userID: { $not: { $eq: userId} }}).lean()
    res.json(place)
}

const getRent = async(req, res)=>{
    const {userId} = req.user
    const place = await Place.find({type: {$in: ['House Rental', 'Flat Rental']},
    userID: { $not: { $eq: userId} }})
    .sort({'points': -1}).lean().limit(12)
    res.json(place)
}
const getHomeStay = async(req, res)=>{
    const {userId} = req.user
    const place = await Place.find({type: {$in: ['House Homestay', 
    'Flat Homestay','Tent Homestay', 'Farm Homestay', 'Tree house Homestay',
     'Cabin Homestay']}, userID: { $not: { $eq: userId} }})
    .sort({'points': -1}).lean().limit(12)
    res.json(place)
}
const getHostel = async(req, res)=>{
    const {userId} = req.user
    const place = await Place.find({type: 'Hostel',
    userID: { $not: { $eq: userId} }})
    .sort({'points': -1}).lean().limit(12)
    res.json(place)
}
const getHotel = async(req, res)=>{
    const {userId} = req.user
    const place = await Place.find({type: 'Hotel',
    userID: { $not: { $eq: userId} }})
    .sort({'points': -1}).lean().limit(12)
    res.json(place)
}
const getPg = async(req, res)=>{
    const {userId} = req.user
    const place = await Place.find({type:'Paying guest',
    userID: { $not: { $eq: userId} }})
    .sort({'points': -1}).lean().limit(12)
    res.json(place)
}

module.exports = {getPlace, getAllPlace, getRent, getHomeStay,
     getHotel, getHostel, getPg}