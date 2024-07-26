const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    users:{
        type:Number,
        default:0
    },
    subscription:{
type:Number,
default:0
    },
    views:{
type:Number,
default:0
    }


},{
    timestamps:true})

    module.exports = mongoose.model('Stats',statsSchema)