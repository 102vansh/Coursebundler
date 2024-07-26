const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { contact, requestcourse, getdashboarddata } = require("../controllers/othercontroller");
const router = express.Router();

router.route('/contact').post(isAuthenticated,contact)
router.route('/request').post(isAuthenticated,requestcourse)
router.route('/admin/stats').get(isAuthenticated,getdashboarddata)
module.exports = router