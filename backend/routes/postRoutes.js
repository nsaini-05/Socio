const express = require('express')
const router  = express.Router();


const {createPost , getAllposts, getSinglePost , deletePost , updatePost}  =require('../controllers/postControllers');
const {isAuthenticatedUser , authorizeRoles} = require('../middlewares/auth');

router.route('/post/create').post(isAuthenticatedUser,createPost);
router.route('/me/posts').get(isAuthenticatedUser,getAllposts);
router.route('/post/:id').get(getSinglePost);
router.route('/post/:id').delete(isAuthenticatedUser, deletePost);
router.route('/post/:id').put(isAuthenticatedUser ,updatePost);
module.exports = router;