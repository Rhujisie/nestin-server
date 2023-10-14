const express = require('express')
const router = express.Router()

const {createPlace,getPlace, updatePoints, getAllPlace,
    updatePlace,deletePlace} = require('../controller/place')

router.route('/').post(createPlace).get(getAllPlace)
router.get('/:id', getPlace)
router.patch('/update/:id', updatePlace)
router.patch('/point/:id', updatePoints)
router.delete('/delete/:id', deletePlace)

module.exports = router