import express from "express";
import userModel from "../../Models/User/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !phone ||
      username === "" ||
      phone === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).json({ message: "Already Register please login" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 12);
    //save user

    const user = new userModel({
      username,
      email,
      password,
      phone,
    });

    await user.save();
    res.status(200).json({ message: "Registration SuccessFull" });
    // console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error iN User Controller",
    });
  }
});

export default router;
