import express from "express";
import userModel from "../../Models/User/userModel.js";
import bcryptjs from "bcryptjs";
import {
  errorMiddleware,
  userRegistrationValidation,
} from "../../Middleware/validations/index.js";
import jwt from "jsonwebtoken";

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
      //save user

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
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
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

export default router;
