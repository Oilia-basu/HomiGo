const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { fullname, email, phoneNo, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullname,
      email,
      phoneNo,
      password: hashedPassword,
    });

    // Create JWT token
    const token = createSecretToken(user._id);

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNo: user.phoneNo,
      },
    });

  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


//Login


module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // User not found
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    // Incorrect password
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Create JWT token
    const token = createSecretToken(user._id);

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    // Successful login
    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNo: user.phoneNo,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
