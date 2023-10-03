const express = require("express");
const router = express.Router();
const userControllers = require('../controllers/auth')


router.post("/signUp",userControllers.signUp)
router.post("/logIn",userControllers.logIn)
router.post("/logout",userControllers.logout)
router.get("/refresh",userControllers.refreshTokens)


module.exports = router
