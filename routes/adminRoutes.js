const express = require("express");

const router = express.Router();


const {verifyToken}=require("../middleware/authMiddleware");

const {isAdmin}=require("../middleware/adminMiddleware");


const adminController=require("../controllers/adminController");



router.get(
"/admin",
verifyToken,
isAdmin,
adminController.getAllComplaints
);
router.get(
    "/admin/search",
    verifyToken,
    isAdmin,
    adminController.searchComplaints
);
router.post(
"/admin/update-status",
verifyToken,
isAdmin,
adminController.updateStatus
);
router.get(
    "/admin/filter",
    verifyToken,
    isAdmin,
    adminController.filterComplaints
);
// View Complaint Details

router.get(
    "/admin/complaint/:id",
    verifyToken,
    isAdmin,
    adminController.getComplaintDetails
);

module.exports=router;