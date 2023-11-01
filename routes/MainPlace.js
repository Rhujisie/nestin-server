const Place = require('../model/Place')
const express = require('express')
const router = express.Router()

const {getAll, getPlace} = require('../controller/MainPlace')

router.get('/:id', getPlace)
router.get('/all/:id',getAll)

module.exports = router