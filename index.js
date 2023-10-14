//import dependencies
require('dotenv').config()
require('express-async-errors')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const multer = require('multer')
const fs = require('fs')
//config
const corsOptions = require('./config/corsOptions')
//const credentials = require('./middleware/credential')


//import routes
const userRouter = require('./routes/Auth')
const profileRouter = require('./routes/profile')
const refreshRouter = require('./routes/refresh')
const logoutRouter = require('./routes/logout')
const placeRouter = require('./routes/place')
const wishlistRouter = require('./routes/Wishlist')
const reviewRouter = require('./routes/Review')
const mainPlaceRouter = require('./routes/MainPlace')
const userMainPlaceRouter = require('./routes/UserMain')
const pointsRouter = require('./routes/Points')


//import error handler middleware
const errorHandler = require('./middleware/errorHandler')
const notFoundHandler = require('./middleware/notFound')
const authenticationMiddleware = require('./middleware/authentication')


//import connectDB
const connectDB = require('./connect')

//import express
const express = require('express')
const app = express()

const photoMiddleware = multer({dest: 'uploads'})

//dependencies middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
///app.use(credentials)
app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000

// routes

//upload Photo temporary
app.post('/api/v1/uploads', photoMiddleware.array('photos', 100), (req, res)=>{
    const uploadedFiles = []
    console.log('files',req.files)
    for(let i = 0; i < req.files.length; i++){
        const {path, originalname} = req.files[i]
        const part = originalname.split('.')
        const newPath = path.replaceAll('\\', '/') + '.' + part[part.length - 1]
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads/', ''))
    }
    res.json(uploadedFiles)
})
app.use('/uploads', express.static('./uploads'))
app.get('/', (req, res)=>{
    res.send('Hello there, welcome to nestin API')
})
app.use('/api/v1', userRouter)
app.use('/api/v1/refresh', refreshRouter)
app.use('/api/v1/logout', logoutRouter)
app.use('/api/v1/main', mainPlaceRouter)
app.use('/api/v1/review', reviewRouter)
app.use('./api/v1/points', pointsRouter)
app.use('/api/v1/user/main', authenticationMiddleware, userMainPlaceRouter)
app.use('/api/v1', authenticationMiddleware, profileRouter)
app.use('/api/v1/place', authenticationMiddleware, placeRouter)
app.use('/api/v1/wishlist', authenticationMiddleware, wishlistRouter)


//error handler middleware
app.use(notFoundHandler)
app.use(errorHandler)
//connect to DB
const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, ()=>{
            console.log(`Server is listening on port ${PORT}`)
        })
    }catch(err){
        console.log(err)
    }
}

start()