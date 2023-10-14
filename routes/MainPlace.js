const express = require('express')
const router = express.Router()

const {getAll, getHomeStay, getHostel, 
    getHotel, getPg, getRent, getPlace,
} = require('../controller/MainPlace')

router.get('/all',getAll)
router.get('/rent',getRent)
router.get('/homestay',getHomeStay)
router.get('/hostel',getHostel)
router.get('/hotel',getHotel)
router.get('/pg',getPg)
router.get('/:id', getPlace)

module.exports = router