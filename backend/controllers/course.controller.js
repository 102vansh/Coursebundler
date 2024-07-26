const { ErrorHandler } = require('../middleware/error')
const Course = require('../models/Course.model')
const stats = require('../models/stats')
const getDataUri = require('../utils/dataUri')
const cloudinary = require('cloudinary')
exports.getallcourses = async (req, res) => {
    try {
        const keywoard = req.query.keywoard || ""
        const category = req.query.category || ""

        const courses = await Course.find({
            title: { $regex: keywoard, $options: "i" },
            category: { $regex: category, $options: "i" },
        })
        
        res.status(200).json({
            success: true,
            message: "All courses found",
             courses
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.createcourse = async (req, res,next) => {
const{title,description,category,createdBy}=req.body
console.log(req.body)
if(!title || !description || !category || !createdBy){
    return next(new ErrorHandler("Please enter all fields", 400))
}
    try{
        const {poster}=req.files
const mycloud = await cloudinary.v2.uploader.upload(poster.tempFilePath)
    
if(!mycloud){
    return next(new ErrorHandler("Please upload an image", 400))
}

const newcourse = await Course.create({title,description,category,createdBy,poster:{
    public_id:mycloud.public_id, 
    url:mycloud.secure_url}})
    res.status(200).json({
        success: true,
        message: "Course created successfully",
         newcourse
    })
    }catch(error){
return next(error)
    }
}
exports.getcourselecture = async(req, res,next) => {
    try{
const course = await Course.findById(req.params.id)
if(!course){
    return next(new ErrorHandler("Course not found", 404))
}
course.views = course.views + 1

await course.save()
    res.status(200).json({
        success: true,
        message: "Course lecture found",
         lectures:course.lectures
    })
    }catch(error){
        return next(error)
    }
}
exports.createlecture = async(req, res,next) => {
try{
    const{title,description}=req.body
    const{video} = req.files
const course = await Course.findById(req.params.id)
if(!course){
    return next(new ErrorHandler("Course not found", 404))
}

const mycloud = await cloudinary.v2.uploader.upload(video.tempFilePath)

if(!mycloud){
    return next(new ErrorHandler("Please upload an image", 400))
}

course.lectures.push({title,description,video:{
    public_id:mycloud.public_id,
    url:mycloud.secure_url
}})
course.numOfVideos = course.lectures.length
await course.save()
    res.status(200).json({
        success: true,
        message: "Lecture created successfully",
        course
         
    })
}catch(error){
return next(error)
}
}
exports.deletecourse = async(req, res,next)=>{
    try{
const course = await Course.findById(req.params.id)
if(!course){
    return next(new ErrorHandler("Course not found", 404))
}

await cloudinary.v2.uploader.destroy(course.poster.public_id)
for(let i=0;i<course.lectures.length;i++){
    const singlelecture = course.lectures[i]
    await cloudinary.v2.uploader.destroy(singlelecture.video.public_id)
}
const deletecourse = await Course.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        message: "Course deleted successfully",
         
    })
    }catch(error){
        return next(error)
    }

}
exports.deletelecture = async(req, res,next)=>{
    try{
        const{courseid,lectureid} = req.query
        const course = await Course.findById(courseid)   
        if(!course){
            return next(new ErrorHandler("Course not found", 404))
        }
        const lecture = course.lectures.find(item => item._id.toString() === lectureid.toString())
        await cloudinary.v2.uploader.destroy(lecture.video.public_id)
        course.lectures = course.lectures.filter(item => item._id.toString() !== lectureid.toString()) 
        course.numOfVideos = course.lectures.length
        await course.save()
        res.status(200).cookie('token', null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            message: "Lecture deleted successfully",
             
        })
        }catch(error){
            return next(error)
        }
    
}   

// Course.watch().on('change', async() => {
//     const stats = await stats.find({}).sort({createdAt: 'desc'}).limit(1)
//     const courses = await Course.find({})
//     totalviews = 0
//     for (let i = 0; i < courses.length; i++) {
//         totalviews += courses[i].views
//     }
//     stats[0].views = totalviews
//     stats[0].createdAt = new Date(Date.now())
//     await stats[0].save()
// })