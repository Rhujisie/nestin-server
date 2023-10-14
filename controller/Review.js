const Review = require('../model/Review')
const User = require('../model/User')

const createReview = async(req, res)=>{
    const {id} = req.params
    const {userId} = req.user
    let reviewExist = await Review.findOne({userID: userId, placeID: id})
    if(reviewExist){
        const review = await Review.findOneAndUpdate({userID: userId, placeID: id},
            req.body, {new: true}).lean()
        return res.status(200).json(review)
    }
    const review = await Review.create({...req.body, placeID: id, userID: userId})
    res.status(200).json(review)
}

const getRating = async(req, res)=>{
    const {id} = req.params
    const review = await Review.findOne({placeID: id}).select('-review')
    .select('-__v').select('-_id').select('-userID').select('-placeID').lean()
    res.status(200).json(review)
}

const getReview = async(req, res)=>{
    const {id} = req.params
    const review = await Review.find({placeID: id})
    .select('review').select('userID').lean()
    const result = []
    for(let i = 0; i < review.length; i++){
        const user = await User.findById(review[i].userID).select('name').lean()
        result.push({name: user.name, reviews: review[i].review})
    }
    res.status(200).json(result)
}

module.exports = {createReview, getRating, getReview}