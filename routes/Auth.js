const express = require('express')
const router = express.Router()

const {registerUser, generateOTP,verifyOTP, resetPassword,
     loginUser} = require('../controller/Auth')

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/generateotp', generateOTP)
router.post('/verifyotp', verifyOTP)
router.patch('/resetpassword', resetPassword)

module.exports = router