const mongoose = require('mongoose')
const WishlistSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please enter user id']
        },
        placeID: [{
            type: mongoose.Types.ObjectId,
            ref: 'Place',
            required: [true, 'Please enter place id']
        }]
    }
)

module.exports = mongoose.model('Wishlist', WishlistSchema)