const { ErrorHandler } = require("../middleware/error");
const User = require("../models/Usermodel");
const { sendEmail } = require("../utils/SendEmail");
const Course = require('../models/Course.model')
const cloudinary = require("cloudinary");

exports.registeruser = async (req, res,next) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return next(new ErrorHandler("please enter all fields", 400));
    }
    const{avatar} = req.files;


    try {
        let user = await User.findOne({ email });
        if(user) {
            return next(new ErrorHandler("user already exists", 400));
        }
        const mycloud = await cloudinary.v2.uploader.upload(avatar.tempFilePath)
        if(!mycloud) {
            return next(new ErrorHandler("image not uploaded", 400));
        }
         user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url
            }
        });

        const token = user.getJWTToken();
        const options = {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days instead of hours
            httpOnly: true,
            sameSite: 'Lax', // Helps with CSRF protection
            secure: process.env.NODE_ENV === 'production', // Only use secure in production
            path: '/' // Ensure the cookie is available across your entire site
        };
        res.status(201).cookie("token", token,options).json({
            status: "success",
            message: "user registered  in successfully",
            user,
            token
        });
      
    } catch (err) {
        return next(err);
    }
}

exports.loginuser = async (req, res,next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return next(new ErrorHandler("please enter all fields", 400));
    }
    try {
        const user = await User.findOne({ email }).select("+password");
        if(!user) {
            return next(new ErrorHandler("invalid credentials", 401));
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return next(new ErrorHandler("invalid credentials", 401));
        }
        const token = user.getJWTToken();
        const options = {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days instead of hours
            httpOnly: true,
            sameSite: 'none', // Helps with CSRF protection
            secure: process.env.NODE_ENV === 'production', // Only use secure in production
            path: '/' // Ensure the cookie is available across your entire site
        };
        res.status(201).cookie("token", token,options).json({
            status: "success",
            message: "user logged in successfully",
            user,
            token
        });
    } catch (err) {
        return next(err);
    }
}
exports.logoutuser = async (req, res,next) => {
    try{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        status: "success",
        message: "user logged out successfully"
    });
} catch(err) {
    return next(err);
}
}

exports.myprofile = async (req, res,next) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            status: "success",
            user
        });
    } catch (err) {
        return next(err);
    }
}
exports.changepassword = async (req, res,next) => {
    const { oldPassword, newPassword } = req.body;
    if(!oldPassword || !newPassword) {
        return next(new ErrorHandler("please enter all fields", 400));
    }
    try {
        const user = await User.findById(req.user._id).select("+password");
        const isMatch = await user.comparePassword(oldPassword);
        if(!isMatch) {
            return next(new ErrorHandler("old password is incorrect", 401));
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({
            status: "success",
            message: "password changed successfully"
        });
    } catch (err) {
        return next(err);
    }
}
exports.updatrprofile = async (req, res,next) => {
    const { name, email } = req.body;
    try {
        const user = await User.findById(req.user._id);
        user.name = name;
        user.email = email;
        await user.save();
        res.status(200).json({
            status: "success",
            message: "profile updated successfully"
        });
    } catch (err) {
        return next(err);
    }
}
exports.updatepicture = async (req, res,next) => {}

exports.forgetpassword = async (req, res,next) => {
    try{
const { email } = req.body;
const user = await User.findOne({ email });
if(!user) {
    return next(new ErrorHandler("user not found", 404));
}
const resetToken = user.getResetToken();
const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
const message = `click on the link below to reset your password ${url}`;
sendEmail(user.email, "password reset", message);
res.status(200).json({
    status: "success",
    message: "password reset link sent to your email"
});
    }catch(err) {
        return next(err);

}}
exports.resetpassword = async (req, res,next) => {
    try{
const {token} = req.params;
const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
});
if(!user) {
    return next(new ErrorHandler("token is invalid or expired", 400));
}
user.password = req.body.password;
user.Resetpasswordtoken = undefined;
user.Resetpasswordexpire = undefined;
await user.save();
res.status(200).json({
    status: "success",
    message: "password reset successfully"
});
    }catch(err) {
        return next(err);
    }
}
exports.addtoplaylist = async (req, res,next) => {
    try{
const user = await User.findById(req.user._id);
const course = await Course.findById(req.body.id);
const itemexist = user.playlist.find((item) => item.course.toString() === course._id.toString());
if(itemexist) {
    return next(new ErrorHandler("course already added to playlist", 400));
}
user.playlist.push({
    course: course._id,
    poster: course.poster.url
})
await user.save();
res.status(200).json({
    status: "success",
    message: "course added to playlist successfully",
    user
});
    }catch(err) {
        return next(err);
    }
}
exports.removefromplaylist = async (req, res,next) => {
    try{
const user = await User.findById(req.user._id);
const course = await Course.findById(req.query.id);
const newplaylist = user.playlist.filter(item => item.course.toString() !== course._id.toString());
user.playlist = newplaylist;
await user.save();
res.status(200).json({
success: true,
    message: "course removed from playlist successfully"
});
    }catch(err) {
        return next(err);
    }
}
exports.updateprofilepicture = async (req, res,next) => {
    try{
        const{avatar} = req.files
const user = await User.findById(req.user._id);
if(!user){
    return next(new ErrorHandler("user not found", 404));
}

const mycloud = await cloudinary.v2.uploader.upload(avatar.tempFilePath)
if(!mycloud) {
    return next(new ErrorHandler("image not uploaded", 400));
}
    await cloudinary.v2.uploader.destroy(user.avatar.public_id)
user.avatar = {
    public_id: mycloud.public_id,
    url: mycloud.secure_url
}
await user.save();
res.status(200).json({
    success: true,
    message: "profile picture updated successfully"
});
    }catch(err) {
        return next(err);
    }
}
exports.geatallusers = async (req, res,next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            users
        });
    }catch(err) {
        return next(err);
    }
}
exports.updateuserrole = async (req, res,next) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user) {
            return next(new ErrorHandler("user not found", 404));
        }
        if(user.role === "user") {
            user.role = "admin";
        }else {
            user.role = "user";
        }
        await user.save();
        res.status(200).json({
            success: true,
            message: "user role updated successfully"
        });

    } catch(err) {
        return next(err);
    }
}
exports.deleteuser = async (req, res,next) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user) {
            return next(new ErrorHandler("user not found", 404));
        }
        const deleteuser = await User.findByIdAndDelete(req.params.id);
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        await deleteuser.save();
        res.status(200).json({
            success: true,
            message: "user deleted successfully"
        });

    } catch(err) {
        return next(err);
    }
}

// User.watch().on("change", async () => {
//     const stats = await Stats.find({}).sort({createdAt: "desc"}).limit(1);
    
//     const subscription = await User.find({'subscription.status': "active"});
//     stats[0].users = await User.countDocuments();
//     stats[0].createdAt = new Date(Date.now());
//     stats[0].subscription = subscription.length;
//     await stats[0].save();
// })
