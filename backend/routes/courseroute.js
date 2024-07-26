const express = require('express');
const { getallcourses, createcourse, getcourselecture, createlecture, deletecourse, deletelecture } = require('../controllers/course.controller');
const singleUpload = require('../middleware/multer');
const { authorizeadmin, isAuthenticated, authorizesubscriber } = require('../middleware/auth');
const router = express.Router();

router.route('/allcourse').get(getallcourses)
router.route('/createcourse').post(isAuthenticated,authorizeadmin ,createcourse)
router.route('/getlectures/:id').get(isAuthenticated, authorizesubscriber,getcourselecture)
router.route('/createlecture/:id').post(isAuthenticated,authorizeadmin ,authorizesubscriber, createlecture)
router.route('/deletecourse/:id').delete(isAuthenticated,authorizeadmin,authorizesubscriber,deletecourse)
router.route('/deletelecture').delete(isAuthenticated,authorizeadmin,deletelecture)
module.exports = router