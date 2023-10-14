const express = require('express')
const router = express.Router()

const {getAllPlace, getHomeStay, getHostel, 
    getHotel, getPg, getRent, getPlace,
} = require('../controller/UserMain')

router.get('/all', getAllPlace)
router.get('/rent',getRent)
router.get('/homestay',getHomeStay)
router.get('/hostel',getHostel)
router.get('/hotel',getHotel)
router.get('/pg',getPg)
router.get('/:id', getPlace)

module.exports = router