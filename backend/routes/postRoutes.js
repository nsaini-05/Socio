const express = require('express')
const 
const router  = express.Router();
const {createPost, deletePost}  =require('../controllers/postControllers');
const {isAuthenticated , authorizeRoles} = require('../middlewares/auth');
router.route('/post/create').post(isAuthenticated , createPost)


module.exports = router