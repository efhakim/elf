const express = require("express")
const controller = require("../controllers/user.controller")

const router = express.Router()

router.post("/createNewUser", controller.createUser)
router.post("/getUser", controller.getUser)
router.post("/logIn", controller.logInUser)
router.post("/isLogged", controller.verifyLogin)

module.exports = router