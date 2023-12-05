const express = require("express")
const router = express.Router()
const verifyToken = require("../middleware/auth")
const upload = require("../middleware/upload")
const {getMyExperience, postMyExperience,putMyExperience,getMyExperienceById, getMyExperienceByIdForPerekrut, deleteMyExperienceById} = require("../controllers/experienceController")


router.get("/pekerja", verifyToken, getMyExperience);
router.post("/pekerja", verifyToken,upload.single("photo"),postMyExperience);
router.put("/pekerja/:id", verifyToken,upload.single("photo"), putMyExperience);
router.get("/pekerja/:id", getMyExperienceById);
router.get("/pekerja/:id", getMyExperienceByIdForPerekrut);
router.delete("/pekerja/:id", verifyToken, deleteMyExperienceById);

module.exports = router;