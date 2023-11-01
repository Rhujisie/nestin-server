const OTP = require('../model/Otp')
const User = require('../model/User')

const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')

const {BadRequestError, UnauthenticatedError} = require('../errors')

const registerUser = async (req, res)=>{
    const {email, phoneNumber} = req.body
    const emailAlreadyExists = await User.findOne({email}).lean()
   
    if(emailAlreadyExists){
        throw new BadRequestError('Email is in use')
    }
   
    const numberAlreadyExist = await User.findOne({phoneNumber}).lean()
    if(numberAlreadyExist){
        throw new BadRequestError('Phone number already in use')
    }
    const user = await User.create(req.body)
    const accessToken = user.createAccessJWT()
    const refreshToken = user.createRefreshJWT()
    res.cookie('jwt', refreshToken, 
        // {
        // httpOnly: true, //accessible only by web server
        // // secure: true,//https
        // sameSite: 'None',//cross-site cookie
        // maxAge: 7 * 24 * 60 * 60 * 1000,//cookie expiry: set to macth rt
        // }
    )
    console.log('register-',req.cookies, refreshToken)
    res.status(200).json({accessToken, roles: user.roles, name: user.name})
}
const loginUser = async (req, res)=>{
    const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError('Please enter email and passowrd')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Incorrect email')
    }
    const isCorrectPassword = await user.comparePassword(password)
    
    if(!isCorrectPassword){
        throw new UnauthenticatedError('Incorrect Password')
    }
    const accessToken = user.createAccessJWT()
    const refreshToken = user.createRefreshJWT()
    res.cookie('jwt', refreshToken, 
        // {
        // //httpOnly: true, //accessible only by web server
        // //secure: true,//https
        // sameSite: 'None',//cross-site cookie
        // maxAge: 7 * 24 * 60 * 60 * 1000,//cookie epiry: set to macth rt
        // }
    )
    console.log('login-',req.cookies, refreshToken)
    res.status(200).json({accessToken, roles:user.roles, name: user.name})
}
const generateOTP = async (req, res)=>{
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Incorrect email')
    }
    const otp = otpGenerator.generate(6, {  upperCaseAlphabets: false, 
                                            specialChars: false,
                                            lowerCaseAlphabets: false});
    const otpExist = await OTP.findOne({email: email})
    if(otpExist){
        await OTP.updateOne({email: email}, {otp: otp})
    }else{
        await OTP.create({email: email, otp: otp})
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'yaga77855@gmail.com', // Your email address
          pass: 'pjtw sowf oyrb qjgn' // Your email password (Use environment variables for security)
        }
    });
    
    let mailOptions = {
        from: 'yaga77855@gmail.com',
        to: email,
        subject: 'Reset password',
        text: `${otp} This OTP will expires in 5-mins`
    };
    await transporter.sendMail(mailOptions);
    res.sendStatus(200)
}
const verifyOTP = async(req, res)=>{
 const {otp, email} = req.body
 const checkOTP = await OTP.findOne({email: email}).select('otp -_id').lean()

 if(!checkOTP){
    throw new UnauthenticatedError('Invalid OTP')
 }
 if(Number(otp) != checkOTP.otp){
    console.log('not match')
    throw new UnauthenticatedError('Incorrect OTP')
 }
 res.sendStatus(200)
}
const resetPassword = async(req, res)=>{
    let {email, password} = req.body
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    const user = await User.updateOne({email: email}, {password: password})
    res.sendStatus(202)
}

module.exports = {registerUser, loginUser, generateOTP, verifyOTP, resetPassword}