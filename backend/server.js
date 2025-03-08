const express = require('express');
const app= express();
const fileupload = require('express-fileupload')
const cors = require('cors');
const Razorpay = require('razorpay')
const nodeCron = require('node-cron')
require('./db/conn')();
const Stats  = require('./models/stats')
const cloudinary = require('cloudinary').v2
const cookieparser = require('cookie-parser')
const userrouter = require('./routes/userroute')
const courserouter = require('./routes/courseroute')
const paymentroute = require('./routes/paymentroutes')
const otherrouter = require('./routes/otherroute')
const quizrouter = require('./routes/quizrouter')
const interviewrouter  = require('./routes/interviewRouter')
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'})
const {errormiddleware} = require('./middleware/error')
const port = process.env.PORT || 3001;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
//  const instance = new Razorpay({
//     key_id:process.env.RAZORPAY_API_KEY,
//     key_secret:process.env.RAZORPAY_API_SECRET
// })
// module.exports = {instance}
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
app.use(cookieparser())
app.use('/api/v1/user',userrouter)
app.use('/api/v1/course',courserouter)
app.use('/api/v1/payment',paymentroute)
app.use('/api/v1/other',otherrouter)
app.use('/api/v1/quiz',quizrouter)
app.use('/api/v1/interview',interviewrouter)
app.use(errormiddleware)
nodeCron.schedule('0 0 0 * * *', async () => {
try{
    await Stats.create({})
}catch(err){
    console.log(err)
}
})

const temp = async () => {
    await Stats.create({}) 
}
temp()
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
