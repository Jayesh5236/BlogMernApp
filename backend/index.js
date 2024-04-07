import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import dbConnect from "./Database/dbConnect.js";
import morgan from "morgan";
import userController from "./Controllers/Users/index.js";

// Configure Dotenv
dotenv.config(); //loads Environment variables from the .env file

// Database Config
dbConnect(); //MongoDb Database Connection

const app = express(); //Intialize Express Web Framework

// Middlewares
app.use(express.json()); //Bodyparser In JSON Response
app.use(morgan("dev")); // Logs incoming requests to the console (useful for development.

const port = process.env.PORT || 5001;

app.use("/api/user", userController);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Backend Is Working" });
});

app.listen(port, () => {
  console.log(chalk.bgMagenta.bold.white(`Server Running On ${port} `));
});
