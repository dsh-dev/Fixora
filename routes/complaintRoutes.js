const express = require("express");

const router = express.Router();

const complaintController = require("../controllers/complaintController");

const upload = require("../middleware/upload");

const { verifyToken } = require("../middleware/authMiddleware");

// New Complaint Page
router.get("/complaint", verifyToken, (req, res) => {
    res.render("complaint");
});

// Submit Complaint
router.post(
    "/complaint",
    verifyToken,
    upload.single("image"),
    complaintController.createComplaint
);

// ✅ NEW: Analyze AI
router.post(
    "/analyze-ai",
    verifyToken,
    complaintController.analyzeAI
);

// Complaint Details
router.get(
    "/complaint/:id",
    verifyToken,
    complaintController.getComplaintDetails
);

router.post(
    "/complaint/delete/:id",
    verifyToken,
    complaintController.deleteComplaint
);
module.exports = router;