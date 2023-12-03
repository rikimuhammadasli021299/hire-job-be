const express = require("express")
const router = express.Router()
const verifyToken = require("../middleware/auth")
const {getPorto, postPorto, detailPortofolioById, putPorto, deletePorto} = require("../controllers/portfolioController")
const upload = require("../middleware/upload")
const { selectPortfolioById } = require("../models/portfolioModel")

router.post("/pekerja", verifyToken, upload.single("photo"), postPorto)
router.get("/pekerja", verifyToken, getPorto)
router.put("/pekerja/:id", verifyToken, upload.single("photo"), putPorto)
router.get("/pekerja/:id", verifyToken, detailPortofolioById)
router.delete("/pekerja/:id", verifyToken, deletePorto)

module.exports = router;