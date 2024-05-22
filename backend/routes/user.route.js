const express = require("express")
const controller = require("../controllers/user.controller")

const requireAuth = require("../middleware/user.middleware")


const router = express.Router()

router.post("/createNewUser", controller.createUser)
router.get("/getUser", controller.getUser)
router.post("/logIn", controller.logInUser)
router.post("/isLogged", controller.verifyLogin)
router.post("/editUser", requireAuth, controller.editUser)

module.exports = router