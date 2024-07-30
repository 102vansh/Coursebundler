
// const mongoose = require('mongoose')
// mongoose.connect("mongodb://0.0.0.0:27017/coursebundler" ,{
//    // useUnifiedTopology:true,
//    // useNewUrlParser:true
// }).then(() => {
//     console.log("connection succeful")
// }).catch((e) => {
//     console.log(e)
// })

require('dotenv').config();
const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://vanshjain:vansh%402002@clusrure-0.jsnrs7g.mongodb.net/?retryWrites=true&w=majority';

if (!dbURI) {
  console.error("Error: MONGODB_URI is not defined in the .env file.");
  process.exit(1);
}

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  mongoose.connect(dbURI).then(() => {
    console.log('MongoDB is connected');
  }).catch(err => {
    console.error('MongoDB connection unsuccessful, retry after 5 seconds. ', err);
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

