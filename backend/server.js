const express = require('express');
const app= express();
const fileupload = require('express-fileupload')
const cors = require('cors');
const Razorpay = require('razorpay')
const nodeCron = require('node-cron')
const connectDB = require('./db/conn');
// Connect to MongoDB but don't exit if connection fails
connectDB().catch(err => console.error('Initial MongoDB connection failed:', err.message));
const Stats  = require('./models/stats')
const cloudinary = require('cloudinary').v2
const cookieparser = require('cookie-parser')
const userrouter = require('./routes/userroute')
const courserouter = require('./routes/courseroute')
const paymentroute = require('./routes/paymentroutes')
const otherrouter = require('./routes/otherroute')
const quizrouter = require('./routes/quizrouter')
const interviewrouter  = require('./routes/interviewRouter')
const terminalrouter = require('./routes/terminalRoute')
const http = require('http');
const socketIo = require('socket.io');
const { setupTerminalSocket } = require('./controllers/terminalController');
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'})
const {errormiddleware} = require('./middleware/error')
const port = process.env.PORT || 3001;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
        
        
  origin: ["https://102vansh.github.io", "https://coursebundler-4.onrender.com"],
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
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
app.use('/api/v1/terminal',terminalrouter)
app.use(errormiddleware)
// Schedule stats creation daily at midnight
nodeCron.schedule('0 0 0 * * *', async () => {
  try {
    await Stats.create({})
    console.log('Daily stats created successfully');
  } catch (err) {
    console.log('Error creating daily stats:', err.message)
  }
})

// Initialize stats - wrapped in try/catch to prevent app crash if DB is unavailable
const initializeStats = async () => {
  try {
    await Stats.create({}) 
    console.log('Initial stats created successfully');
  } catch (err) {
    console.log('Error creating initial stats:', err.message)
    // Continue execution even if stats creation fails
  }
}
initializeStats();
// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    },
    path: '/socket.io'
});

// Setup terminal socket
setupTerminalSocket(io);

// Start the server
server.listen(port, () => {
    console.log(`server running on port ${port}`)
})
