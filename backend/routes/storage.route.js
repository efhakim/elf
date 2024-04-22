const express = require("express")
const controller = require("../controllers/storage.controller")
const requireAuth = require("../middleware/user.middleware")

const router = express.Router()

router.post("/createNewStorage", requireAuth, controller.createStorage)
router.post("/viewStorage", requireAuth, controller.viewStorage)
router.post("/editStorage", requireAuth, controller.editStorage)

module.exports = router