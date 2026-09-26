const express = require("express");

const router = express.Router();

const {
    getProfile,
    updateProfile,
    changePassword,
} = require("../Controllers/UserController");

const verifyToken = require("../Middlewares/AuthMiddlewares");


// Get logged-in user's profile
router.get(
    "/profile",
    verifyToken,
    getProfile
);

// Update profile
router.put(
    "/profile",
    verifyToken,
    updateProfile
);


// Change password
router.put(
    "/change-password",
    verifyToken,
    changePassword
);


module.exports = router;