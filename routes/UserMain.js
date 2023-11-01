const express = require('express')
const router = express.Router()

const {getAllPlace, getPlace} = require('../controller/UserMain')

router.get('/:id', getPlace)
router.get('/all/:id', getAllPlace)

module.exports = router