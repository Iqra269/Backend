const router = require("express").Router();
const userController = require("../controllers/userController");
const middleware = require("../middleware");

router.post("/createUser", middleware.vendor, userController.createUser);
router.get("/getAllUsers", middleware.customer, userController.getAllUsers);
router.delete("/deleteUser", userController.deletesUser);

module.exports = router;
