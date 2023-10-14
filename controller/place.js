const Place = require('../model/Place')

const createPlace = async(req, res)=>{
    const place = await Place.create({...req.body, userID: req.user.userId})
    res.status(201).json(place)
}

const getPlace = async(req, res)=>{
    const {id} = req.params
    const place = await Place.findOne({_id: id}).lean()
    // .select('-userID').select('-_id').select('-__v')
    // .select('-createdAt').select('-updatedAt')
    console.log(place)
    res.status(200).json(place)
}

const getAllPlace = async(req, res)=>{
    const {id} = req.params
    const {userId} = req.user
    const place = await Place.find({userID: userId}).lean()
    // .select('-userID').select('-_id').select('-__v')
    // .select('-createdAt').select('-updatedAt')
    console.log(place)
    res.status(200).json(place)
}


const updatePlace = async(req, res)=>{
    const {id} =req.params
    const place = await Place.findByIdAndUpdate(id, req.body,{new: true}).lean()
    res.status(200).json(place)
}

const deletePlace = async(req, res)=>{
    const {id} = req.params
    await Place.findByIdAndDelete(id).lean()
    res.status(200).json({msg: 'Success'})
}
const updatePoints = async(req, res)=>{
    const {id} = req.params
    const {points} = req.body
    await Place.findByIdAndUpdate(id, {points: points},{new: true}).lean()
    res.status(200).json({msg: 'Success'})
}

module.exports = {
    createPlace,getPlace, updatePlace, deletePlace,updatePoints, getAllPlace
}


