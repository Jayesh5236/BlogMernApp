import express from "express";
import userModel from "../../Models/User/userModel.js";
import bcryptjs from "bcryptjs";
import {
  errorMiddleware,
  userRegistrationValidation,
} from "../../Middleware/validations/index.js";

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
          .json({ message: "Already Register please login" });
      }

      req.body.password = await bcryptjs.hash(req.body.password, 12);
      //save user

      // New User
      const user = new userModel(req.body);

      await user.save();
      res.status(200).json({ message: "Registration SuccessFull" });
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
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error iN Register User Controller",
    });
  }
});

export default router;
