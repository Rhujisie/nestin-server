const express = require('express')
const router = express.Router()

const {updatePoints} = require('../controller/Points')

router.get('/', updatePoints)

module.exports = router