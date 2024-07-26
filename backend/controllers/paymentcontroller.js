// const dotenv = require('dotenv');
// const User = require('../models/Usermodel');
// const { instance } = require('../utils/razorpay')
// dotenv.config({ path: '.config/config.env' });
// exports.buysubscription = async (req, res,next) => {
//     try{
//     const user = await User.findById(req.user._id);
//     if(user.role==='admin'){
//         return res.status(401).json({message:'admin cannot buy subscription'})
//     }
// const plan_id = process.env.PLAN_ID
// const subscription = await instance.subscriptions
//     .create({
//         plan_id: plan_id,
//         customer_notify: 1,
//         total_count: 12,
//     })
//     user.subscription.id = subscription.id

//     user.subscription.status = subscription.status
//     await user.save()
//     return res.json({
//          success: true,
//         subscription
//         })
//     }catch(err){
//         return next(err)
//     }
        

// }

const User = require('../models/Usermodel');
const { instance } = require('../utils/razorpay'); // Ensure the correct path to your razorpay module
const crypto = require('crypto');
const Payment = require('../models/paymentmodal')
exports.buysubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role === 'admin') {
      return res.status(401).json({ message: 'Admin cannot buy subscription' });
    }

    const plan_id = 'plan_OblEBInGmz1yke';
    if (!plan_id) {
      return res.status(500).json({ message: 'Plan ID not found' });
    }

    const subscription = await instance.subscriptions.create({
      plan_id: plan_id,
      customer_notify: 1,
      total_count: 12,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;
    await user.save();

    return res.json({
      success: true,
      subscriptionId: subscription.id,
    });
  } catch (err) {
    console.error('Error in buysubscription:', err); // Log the detailed error
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};
// exports.paymentverification = async (req, res, next) => {
//   try {
//     const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature } =
//       req.body;
// const user = await User.findById(req.user._id);
// const subscription_id = user.subscription.id;
//     const shasum = crypto.createHmac('sha256', 'usyvQA4SMZVKTmiw4tUnuU0i');
//     shasum.update(razorpay_payment_id + '|' + subscription_id, 'utf8');
//     const digest = shasum.digest('hex');
//     const isAuthenticated = shasum === razorpay_signature;
//     if(!isAuthenticated){
//         return res.redirect(`http://localhost:3000/paymentfail`)
//     }
//     await Payment.create({
//       razorpay_subscription_id,
//       razorpay_payment_id,
//       razorpay_signature,})
//     user.subscription.status = 'active';
//     await user.save();
//     return res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
//   } catch (err) {
//     console.error('Error in paymentverification:', err); // Log the detailed error  
//   }
// }

exports.paymentverification = async (req, res, next) => {
  try {
    const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const subscription_id = user.subscription.id;
    
    // Calculate HMAC digest
    const shasum = crypto.createHmac('sha256', 'usyvQA4SMZVKTmiw4tUnuU0i');
    shasum.update(`${razorpay_payment_id}|${subscription_id}`, 'utf8');
    const digest = shasum.digest('hex');

    // Compare the digest with the signature
    const isAuthenticated = digest === razorpay_signature;
    if (!isAuthenticated) {
      return res.redirect('http://localhost:3000/paymentfail');
    }

    // Create payment record
    await Payment.create({
      razorpay_subscription_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    // Update user subscription status
    user.subscription.status = 'active';
    await user.save();

    // Redirect to payment success page
    return res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
  } catch (err) {
    console.error('Error in paymentverification:', err); // Log the detailed error
    return res.status(500).send('Internal Server Error');
  }
};

exports.cancelsubscription = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const subscription_id = user.subscription.id;
    let refund = false
    const subscription = await instance.subscriptions.cancel(subscription_id);
    const payment = Payment.findOne({ razorpay_subscription_id: subscription_id });
    const gap = Date.now() - payment.createdAt;
    const refundtime = 7* 24 * 60 * 60 * 1000;
    if (gap <= refundtime) {
    await instance.payments.refund(payment.razorpay_payment_id);
    refund = true
    }
await Payment.deleteOne({ razorpay_subscription_id: subscription_id });
    user.subscription.id = undefined;
    user.subscription.status = undefined;
    await user.save();
    return res.json({
        success: true,
        message: 'Subscription cancelled you will recieve full refund within 7 days',
        subscription
    })
}

exports.getrazorpaykey = async (req, res, next) => {

    res.status(200).json({
        success: true,
        key: 'rzp_test_opkSH8uSHUfQcZ'})
}