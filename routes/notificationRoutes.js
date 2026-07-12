const express = require("express");

const router = express.Router();


const {verifyToken} = require("../middleware/authMiddleware");


const notificationController = require("../controllers/notificationController");



// View Notifications

router.get(
    "/notifications",
    verifyToken,
    notificationController.getNotifications
);



// Mark as Read

router.get(
    "/notifications/read/:id",
    verifyToken,
    notificationController.markAsRead
);



module.exports = router;