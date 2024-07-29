
const mongoose = require('mongoose')
mongoose.connect("mongodb://0.0.0.0:27017/coursebundler" ,{
   // useUnifiedTopology:true,
   // useNewUrlParser:true
}).then(() => {
    console.log("connection succeful")
}).catch((e) => {
    console.log(e)
})

