const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");


// =====================================================
// GET USER PROFILE
// =====================================================
module.exports.getProfile = async (req, res) => {
    try {

        // User ID comes from verifyToken middleware
        const userId = req.userId;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNo: user.phoneNo,
                createdAt: user.createdAt,
            },
        });

    } catch (error) {

        console.error("Get Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch profile",
        });
    }
};


// =====================================================
// UPDATE USER PROFILE
// =====================================================
module.exports.updateProfile = async (req, res) => {
    try {

        const userId = req.userId;

        const {
            fullname,
            email,
            phoneNo,
        } = req.body;


        // ---------------------------------------------
        // Validate fields
        // ---------------------------------------------
        if (!fullname || !email || !phoneNo) {
            return res.status(400).json({
                success: false,
                message: "Name, email and phone number are required",
            });
        }


        // ---------------------------------------------
        // Check whether email belongs to another user
        // ---------------------------------------------
        const existingUser = await User.findOne({
            email: email,
            _id: { $ne: userId },
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already in use",
            });
        }


        // ---------------------------------------------
        // Update user
        // ---------------------------------------------
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                fullname: fullname.trim(),
                email: email.trim().toLowerCase(),
                phoneNo: phoneNo,
            },
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");


        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                fullname: updatedUser.fullname,
                email: updatedUser.email,
                phoneNo: updatedUser.phoneNo,
                createdAt: updatedUser.createdAt,
            },
        });

    } catch (error) {

        console.error("Update Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update profile",
        });
    }
};


// =====================================================
// CHANGE PASSWORD
// =====================================================
module.exports.changePassword = async (req, res) => {
    try {

        const userId = req.userId;

        const {
            currentPassword,
            newPassword,
        } = req.body;


        // ---------------------------------------------
        // Validate fields
        // ---------------------------------------------
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required",
            });
        }


        // ---------------------------------------------
        // Password length
        // ---------------------------------------------
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 6 characters",
            });
        }


        // ---------------------------------------------
        // Find user
        // ---------------------------------------------
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        // ---------------------------------------------
        // Verify current password
        // ---------------------------------------------
        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password
        );


        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
        }


        // ---------------------------------------------
        // Hash new password
        // ---------------------------------------------
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );


        // ---------------------------------------------
        // Save new password
        // ---------------------------------------------
        user.password = hashedPassword;

        await user.save();


        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {

        console.error("Change Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to change password",
        });
    }
};

