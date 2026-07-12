const express = require("express");

const router = express.Router();

const {verifyToken} = require("../middleware/authMiddleware");

const studentController = require("../controllers/studentController");


// Dashboard

router.get(
    "/dashboard",
    verifyToken,
    studentController.getDashboard
);



// My Complaints

router.get(
    "/my-complaints",
    verifyToken,
    studentController.getMyComplaints
);

router.get(
    "/profile",
    verifyToken,
    studentController.getProfile
);
// Update Profile

router.post(
    "/update-profile",
    verifyToken,
    studentController.updateProfile
);
module.exports = router;