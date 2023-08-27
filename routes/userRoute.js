// const express = require("express");
// const bcrypt = require("bcryptjs");
// const User = require("../models/register");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// // const requireSignIn = require("../middleware/authMiddleware");

// const router = express.Router();
// router.use(cookieParser());

// require("dotenv").config();

// router.post("/register", async (req, res) => {
//   try {
//     const password = req.body.password;
//     const cpassword = req.body.cpassword;

//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: password,
//       cpassword: cpassword,
//     });

//     // Check if user already exists
//     const existingUser = await User.findOne({email: req.body.email});

//     if (existingUser) {
//       return res.status(200).send({
//         success: false,
//         message: "User already registered",
//       });
//     }

//     // Register the user
//     const registeredUser = await newUser.save();

//     return res.status(201).send({
//       success: true,
//       message: "User Registered Successfully",
//       registeredUser,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Error in registration",
//       error: err.message,
//     });
//   }
// });

// // Login endpoint
// router.post("/login", async (req, res) => {
//   try {
//     const {email, password} = req.body;
//     const user = await User.findOne({email: email});
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "No user Found",
//       });
//     }
//     //check if password is match
//     const match = await bcrypt.compare(password, user.password);
//     if (match) {
//       const token = jwt.sign(
//         {email: user.email, id: user._id, username: user.username},
//         process.env.JWT_SECRET,
//         {expiresIn: "1d"}
//       );
//       res.status(200).send({
//         success: true,
//         message: "login Successfully",
//         user: {
//           _id: user._id,
//           username: user.username,
//           email: user.email,
//         },
//         token,
//       });
//     }
//     if (!match) {
//       res.status(200).send({
//         success: false,
//         message: "pasword does not match",
//       });
//     }
//   } catch (error) {
//     res.status(400).send("invalid details");
//   }
// });

// module.exports = router;

/******************************************** */

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/register");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const requireSignIn = require("../middleware/authMiddleware");

const router = express.Router();
router.use(cookieParser());

require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: password,
      cpassword: cpassword,
    });

    // Check if user already exists
    const existingUser = await User.findOne({email: req.body.email});

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already registered",
      });
    }

    // Register the user
    const registeredUser = await newUser.save();

    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      registeredUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: err.message,
    });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "No user Found",
      });
    }
    //check if password is match
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        {email: user.email, id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
      );
      res.status(200).send({
        success: true,
        message: "login Successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    }
    if (!match) {
      res.status(200).send({
        success: false,
        message: "pasword does not match",
      });
    }
  } catch (error) {
    res.status(400).send("invalid details");
  }
});

//protected route

router.get("/recorder", requireSignIn, (req, res) => {
  res.status(200).send({ok: true});
});

module.exports = router;
