const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { buysubscription, paymentverification, cancelsubscription, getrazorpaykey } = require("../controllers/paymentcontroller");
const router = express.Router();


router.route('/buy').get(isAuthenticated,buysubscription)
router.route('/verification').post(isAuthenticated,paymentverification)
router.route('/cancel').delete(isAuthenticated,cancelsubscription)
router.route('/getkey').get(getrazorpaykey)

module.exports = router