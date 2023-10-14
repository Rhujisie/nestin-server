const express = require('express')
const router = express.Router()

const {getWishlistPlaces,
     getWishlist, 
     updateWishlist} = require('../controller/Wishlist')

router.route('/').get(getWishlistPlaces)
router.route('/list').get(getWishlist)
router.patch('/update/:id', updateWishlist)

module.exports = router