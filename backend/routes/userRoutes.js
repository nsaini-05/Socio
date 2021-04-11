const express = require ('express');
const router = express.Router();
const {registerUser,
     loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getMyProfile,
    updatePassword,
    updateProfile,
    getUserProfile,
    sendFollowRequest,
    getFollowersList,
    getFollowingList,
    getAllNotifications,
    acceptFollowRequest,
    denyFollowRequest    
    } = require('../controllers/authControllers');

const {isAuthenticatedUser , authorizeRoles } = require('../middlewares/auth');
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logout);
//router.route('/sample').get(isAuthenticatedUser,sample);

router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser , getMyProfile);
router.route('/updatepassword').post(isAuthenticatedUser , updatePassword);
router.route('/user/update').post(isAuthenticatedUser , updateProfile);

//
router.route('/user/:id').get(isAuthenticatedUser , getUserProfile);
router.route('/follow/:id').get(isAuthenticatedUser , sendFollowRequest);

router.route('/followers').get(isAuthenticatedUser , getFollowersList);
router.route('/following').get(isAuthenticatedUser , getFollowingList);

router.route('/notifications').get(isAuthenticatedUser , getAllNotifications)
router.route('/notifications/accept/:id').get(isAuthenticatedUser , acceptFollowRequest)
router.route('/notifications/deny/:id').get(isAuthenticatedUser , denyFollowRequest)


//User admin realted routes





module.exports = router;



