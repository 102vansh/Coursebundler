const express = require("express");
const { registeruser, loginuser, logoutuser, myprofile, changepassword, updatrprofile, forgetpassword, resetpassword, addtoplaylist, removefromplaylist, updateprofilepicture, geatallusers, updateuserrole, deleteuser } = require("../controllers/user.controller");
const { isAuthenticated, authorizeadmin } = require("../middleware/auth");
const router = express.Router();

router.route('/register').post(registeruser)
router.route('/login').post(loginuser)
router.route('/logout').get(logoutuser)
router.route('/myprofile').get(isAuthenticated,myprofile)
router.route('/changepassword').put(isAuthenticated,changepassword)
router.route('/updateprofile').put(isAuthenticated,updatrprofile)
router.route('/forgotpassword').post(forgetpassword)
router.route('/resetpassword/:token').put(resetpassword)
router.route('/addtoplaylist').post(isAuthenticated,addtoplaylist)
router.route('/removeplaylist').delete(isAuthenticated,removefromplaylist)
router.route('/updateprofile').put(isAuthenticated,updateprofilepicture)
router.route('/admin/getalluser').get(isAuthenticated,authorizeadmin,geatallusers)
router.route('/admin/updaterole/:id').put(isAuthenticated,authorizeadmin,updateuserrole)
router.route('/admin/deleteuser/:id').delete(isAuthenticated,deleteuser)
module.exports = router