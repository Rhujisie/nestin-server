const express = require('express')
const router = express.Router()

const {getUser, updateUser} = require('../controller/profile')

router.get('/profile', getUser)
router.post('/updateProfile', updateUser)

module.exports = router