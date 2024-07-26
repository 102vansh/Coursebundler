const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate:validator.isEmail
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    
avatar: {
    public_id:{
        type: String
    },
    url:{
        type: String
    }
},
subscription:{
    id:String,
    status:String
},
playlist:[
    {
        course:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
        poster:String
    },

],
Resetpasswordtoken:String,
Resetpasswordexpire:String


},{
    timestamps: true});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
userSchema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
   this.Resetpasswordtoken = crypto.createHash("sha256").update(resetToken).digest("hex");
   this.Resetpasswordexpire = Date.now() + 15*60*1000;
   return resetToken;
}
    
module.exports = mongoose.model("User", userSchema);