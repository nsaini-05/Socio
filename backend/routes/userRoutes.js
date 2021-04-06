const express = require ('express');
const router = express.Router();
const {registerUser} = require('../controllers/userControllers');

router.route('/register').post(registerUser);
module.exports = router;


