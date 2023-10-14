const Place = require('../model/Place')

const getPlace = async(req, res)=>{
    const {id} = req.params
    const place = await Place.findOne({_id: id}).lean()
    // .select('-userID').select('-_id').select('-__v')
    // .select('-createdAt').select('-updatedAt')
    res.status(200).json(place)
}

const getAll = async(req, res)=>{
    const place = await Place.find().sort({'points': -1}).lean().limit(12)
    console.log('place', place)
    res.json(place)
}
const getRent = async(req, res)=>{
    const place = await Place.find({type: {$in: ['House Rental', 'Flat Rental']}})
    .sort({'points': -1}).lean().limit(12)
    res.json(place)
}
const getHomeStay = async(req, res)=>{
    const place = await Place.find({type: {$in: ['House Homestay', 'Flat Homestay','Tent Homestay', 'Farm Homestay', 'Tree house Homestay', 'Cabin Homestay']}})
    .sort({'points': -1}).lean().limit(12)
    res.json(place)
}
const getHostel = async(req, res)=>{
    const place = await Place.find({type: 'Hostel'})
    .sort({'points': -1}).lean().limit(12)
    res.json(place)
}
const getHotel = async(req, res)=>{
    const place = await Place.find({type: 'Hotel'})
    .sort({'points': -1}).lean().limit(12)
    res.json(place)
}
const getPg = async(req, res)=>{
    const place = await Place.find({type:'Paying guest'})
    .sort({'points': -1}).lean().limit(12)
    console.log(place)
    res.json(place)
}

module.exports = {getAll, getHomeStay, getHostel, 
    getHotel, getPg, getRent, getPlace,
}