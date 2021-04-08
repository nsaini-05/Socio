const express = require ('express');
const router = express.Router();
const {registerUser,
     loginUser,
      logout,
       forgotPassword,
       resetPassword,
       getUserProfile,
       updatePassword,
       updateProfile} = require('../controllers/authControllers');
const {isAuthenticatedUser , authorizeRoles } = require('../middlewares/auth');


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser,authorizeRoles('user'), logout);
//router.route('/sample').get(isAuthenticatedUser,sample);

router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser , getUserProfile);
router.route('/updatepassword').post(isAuthenticatedUser , updatePassword);
router.route('/user/update').post(isAuthenticatedUser , updateProfile);


module.exports = router;


