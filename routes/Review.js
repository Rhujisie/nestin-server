const express = require('express')
const router = express.Router()

const {createReview, getRating,getReview} = require('../controller/Review')

router.post('/:id', createReview)
router.get('/rating/:id', getRating)
router.get('/comment/:id', getReview)

module.exports = router