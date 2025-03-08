const jwt = require("jsonwebtoken");
const User = require('../models/Usermodel');
const { ErrorHandler } = require("./error");

exports.isAuthenticated = async (req, res, next) => {
    try {
        console.log('Cookies received:', req.cookies); // Log all cookies
        const { token } = req.cookies;
        console.log('Token from cookies:', token);
        
        if (!token) {
            return next(new ErrorHandler("Login first to access this resource", 401));
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // For debugging - log the decoded token
        console.log("Decoded token:", decoded);
        
        req.user = await User.findById(decoded._id);
        
        if (!req.user) {
            return next(new ErrorHandler("User not found", 404));
        }
        
        next();
    } catch (err) {
        // Handle JWT errors specifically
        if (err.name === "JsonWebTokenError") {
            return next(new ErrorHandler("Invalid token. Please login again", 401));
        }
        if (err.name === "TokenExpiredError") {
            return next(new ErrorHandler("Token expired. Please login again", 401));
        }
        
        return next(err);
    }
};

exports.authorizeadmin = async (req, res, next) => {
    if (req?.user?.role !== "admin") {
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