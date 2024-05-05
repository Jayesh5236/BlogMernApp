import express from "express";
import userModel from "../../Models/User/userModel.js";
import bcryptjs from "bcryptjs";
import {
  errorMiddleware,
  userRegistrationValidation,
} from "../../Middleware/validations/index.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../../utils/verifyUser.js";

const router = express.Router();

/*
    API: Register User
    Method : POST
    Desc : User signup
    Access Type : Public
*/

router.post(
  "/register",
  userRegistrationValidation(),
  errorMiddleware,
  async (req, res) => {
    try {
      const { username, email, password, phone } = req.body;

      //check user
      const exisitingUser = await userModel.findOne({ email });
      //exisiting user
      if (exisitingUser) {
        return res
          .status(200)
          .send({ success: false, message: "Already Register please login" });
      }

      req.body.password = await bcryptjs.hash(req.body.password, 12);

      // New User
      const user = new userModel(req.body);

      await user.save();
      res
        .status(200)
        .send({ success: true, message: "Registration SuccessFull", user });
      // console.log(req.body);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error iN Register User Controller",
      });
    }
  }
);

/*
    API: Login User
    Method : POST
    Desc : User Login
    Access Type : Public
*/

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        message: "Invalid Email And Password",
        success: false,
      });
    }

    // Check user

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }

    const match = await bcryptjs.compare(password, user.password);

    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.status(200).send({
      message: "Login SuccessFull",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error iN Login User Controller",
    });
  }
});

// Google Auth Register

router.post("/google", async (req, res) => {
  try {
    const { name, email, googlePhotoUrl, mobileNumber } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      const { password, ...rest } = user._doc;
      res.status(200).send({
        success: true,
        message: "Google Registration Is Done",
        token,
        user: rest,
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await bcryptjs.hash(generatedPassword, 12);

      const newUser = new userModel({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        phone: mobileNumber,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      const { password, ...rest } = newUser._doc;

      res.status(200).send({
        success: true,
        message: "Google Auth Register Done",
        token,
        newUser: rest,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Google Auth Failed",
    });
  }
});

// Update User

router.put("/update/:userID", authMiddleware, async (req, res) => {
  try {
    // console.log(req.user);
    if (req.user._id !== req.params.userID) {
      return res.status(403).send({
        success: false,
        message: "You Are Not Allowed To Update The User",
      });
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).send({
          success: false,
          message: "Password Length Must Greater Than 6 Characters",
        });
      }
      req.body.password = await bcryptjs.hash(req.body.password, 12);
    }

    if (req.body.username) {
      if (req.body.username.length < 6 || req.body.username > 20) {
        return res.status(400).send({
          success: false,
          message:
            "Username Must be Greater Than 7 and Less Than 20 Characters",
        });
      }
      if (req.body.username.includes(" ")) {
        return res.status(401).send({
          success: false,
          message: "Username Can nOt Contain Spaces",
        });
      }

      if (req.body.username !== req.body.username.toLowerCase()) {
        return res.status(401).send({
          success: false,
          message: "Username Must Be in LowerCase",
        });
      }

      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return res.status(401).send({
          success: false,
          message: "Username can only Contain Letters And Numbers",
        });
      }
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.userID,
      {
        $set: {
          username: req.body.username,
          email: req.body.username,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).send({
      success: true,
      message: "User Updated SuccessFully",
      updatedUser: rest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Updating User Failed",
    });
  }
});

// Delete Account

router.delete("/delete/:userId", authMiddleware, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(403).send({
        success: false,
        message: "You Are Not Allowed To delete This User",
      });
    }

    await userModel.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User Has Been Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "User Delete Failed",
    });
  }
});

export default router;
