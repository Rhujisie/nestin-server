const Wishlist = require('../model/Wishlist')
const Place = require('../model/Place')
const getWishlistPlaces = async(req, res)=>{
    const {userId} = req.user
    const wishlist = await Wishlist.findOne({userID: userId}).lean()
    const result = []
    if(wishlist){
        for(let i = 0; i < wishlist.placeID.length; i++){
            const place = await Place.findById(wishlist.placeID[i]).lean()
            result.push(place)
        }
    }
    res.status(200).json(result)
}
const getWishlist = async(req, res)=>{
    const {userId} = req.user
    const wishlist = await Wishlist.findOne({userID: userId}).select('placeID').lean()
    if(wishlist) return res.status(200).json(wishlist)
    res.status(200).json([])
}
const updateWishlist = async(req, res)=>{
    const {userId} = req.user
    const {id} = req.params
    const checkWishlist = await Wishlist.findOne({userID: userId}).lean()
    if(!checkWishlist){
        const wishlist = await Wishlist.create({userID: userId, placeID: id})
        return res.json(wishlist)
    }
    const index = checkWishlist.placeID.indexOf(id)
    if(index > -1) checkWishlist.placeID.splice(index, 1)
    else checkWishlist.placeID.push(id)
    await checkWishlist.save()
    res.json(checkWishlist)
}
module.exports = {getWishlistPlaces, getWishlist, updateWishlist}