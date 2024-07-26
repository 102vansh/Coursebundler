
const Stats = require('../models/stats')
const { sendEmail } = require("../utils/SendEmail")


exports.contact = async(req, res,next) => {

try{
const {name,email,message} = req.body
const to = 'Np6lR@example.com'
const subject = 'contact form cousebundler'
const text = `I am ${name} and my email address is ${email} and my message is ${message}`
await sendEmail(to,subject,text)
res.status(200).json({success:true,
    message:'email sent'})


}catch(err){
    return next(err)
}


}
exports.requestcourse = async(req, res,next) => {
    try{
        const {name,email,course} = req.body
        const to = 'Np6lR@example.com'
const subject = 'contact form cousebundler'
const text = `I am ${name} and my email address is ${email} and my message is ${course}`
await sendEmail(to,subject,text)
res.status(200).json({success:true,
    message:'email sent'})


}catch(err){
    return next(err)
}

}
exports.getdashboarddata = async(req, res,next) => {
    try{
        const stats = await Stats.find({}).sort({createdAt:'desc'}).limit(12)
        const statsdata = []
        for(let i=0;i<stats.length;i++){
            statsdata.push(stats[i])
        }
        const requiredsize = 12 - stats.length
        for(let i=0;i<requiredsize;i++){
            statsdata.unshift({
                users:0,
                subscription:0,
                views:0
            })
        }
        const usercount = statsdata[11].users
        const subscribecount = statsdata[11].subscription
        const viewcount = statsdata[11].views
        let userpercentage = 0
        let subscriptionpercentage = 0
        let viewspercentage = 0
        let userprofit = true
        viewsprofit = true
        subscriptionprofit = true
        if(statsdata[10].users == 0){
            userpercentage = usercount * 100
        }
        if(statsdata[10].subscription == 0){
            subscriptionpercentage = subscribecount * 100
        }
        if(statsdata[10].views == 0){
            viewspercentage = viewcount * 100
        }
        else{
            const difference = {
                users:statsdata[11].users - statsdata[10].users,
                subscription:statsdata[11].subscription - statsdata[10].subscription,
                views:statsdata[11].views - statsdata[10].views
            }
            userpercentage = (difference.users / statsdata[10].users) * 100
            subscriptionpercentage = (difference.subscription / statsdata[10].subscription) * 100
            viewspercentage = (difference.views / statsdata[10].views) * 100
        }
        if(userpercentage < 0){
            userprofit = false
        }
        if(subscriptionpercentage < 0){
            subscriptionprofit = false
        }
        if(viewspercentage < 0){
            viewsprofit = false
        }
        
        
        res.status(200).json({success:true,stats:statsdata,
            usercount,subscribecount,viewcount,userpercentage,subscriptionpercentage,viewspercentage,userprofit,subscriptionprofit,viewsprofit
        })

    }catch(err){
        return next(err)
    }
}