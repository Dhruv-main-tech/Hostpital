const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");

router.post("/add", controller.add);
router.post("/spatient", controller.spatient);
router.post("/addtreatment", controller.addtreatment);
router.post("/streatment", controller.streatment);
router.get("/log", controller.getlog);
router.post("/del", controller.del);
router.get("/alldocs", controller.alldocs);
router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/doctor-patients", controller.getDoctorPatients);
router.get("/doctors", controller.getDoctors);
router.post("/assign-doctor", controller.assignDoctor);
router.put("/update-room", controller.updateRoom);

module.exports = router;
