// const mongoose = require('mongoose')
// mongoose.connect("mongodb://127.0.0.1:27017/coursebundler" ,{
//    // useUnifiedTopology:true,
//    // useNewUrlParser:true
// }).then(() => {
//     console.log("connection succeful")
// }).catch((e) => {
//     console.log(e)
// })

// require('dotenv').config();
// const mongoose = require('mongoose');

// const dbURI = 'mongodb+srv://vanshjain:vansh%402002@clusrure-0.jsnrs7g.mongodb.net/?retryWrites=true&w=majority';

// if (!dbURI) {
//   console.error("Error: MONGODB_URI is not defined in the .env file.");
//   process.exit(1);
// }

// const connectWithRetry = () => {
//   console.log('MongoDB connection with retry');
//   mongoose.connect(dbURI).then(() => {
//     console.log('MongoDB is connected');
//   }).catch(err => {
//     console.error('MongoDB connection unsuccessful, retry after 5 seconds. ', err);
//     setTimeout(connectWithRetry, 5000);
//   });
// };

// connectWithRetry();

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://28vanshjain:vansh%402002@kohina1.ujlok.mongodb.net/?retryWrites=true&w=majority&appName=kohina1';
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 50000, // Increase timeout
      connectTimeoutMS: 50000,
    });
    mongoose.set('debug', true);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;


  //'mongodb+srv://28vanshjain:CustomPassword@demo-1.a4qzx.mongodb.net/?retryWrites=true&w=majority&appName=demo-1'