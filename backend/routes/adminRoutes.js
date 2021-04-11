const express = require ('express');
const router = express.Router();
const {getAllUsers, deleteUser,getAllPosts,deletePost} = require('../controllers/adminController');
const {isAuthenticatedUser , authorizeRoles } = require('../middlewares/auth');

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser);

router.route('/admin/users/posts').get(isAuthenticatedUser,authorizeRoles('admin'),getAllPosts);
router.route('/admin/post/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deletePost);

module.exports = router;
