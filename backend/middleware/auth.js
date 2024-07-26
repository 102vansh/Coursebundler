const jwt = require("jsonwebtoken");
const User = require('../models/Usermodel');
const { ErrorHandler } = require("./error");

exports.isAuthenticated = async (req, res, next) => {
    try{
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    console.log(req.user);
    console.log(decoded._id);
    next();
 } catch(err){
        return next(err)
    }
    }
    exports.authorizeadmin = async (req, res, next) => {
        if (req.user.role !== "admin") {
            return next(new ErrorHandler("Only admins are allowed", 403));
        }
        next();
    }

    exports.authorizesubscriber = async (req, res, next) => {
        if (req.user.subscription.status !== "active" && req.user.role !== "admin") {
            return next(new ErrorHandler("Only subscribers are allowed", 403));
        }
        next();
    }