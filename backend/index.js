import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import dbConnect from "./Database/dbConnect.js";
import morgan from "morgan";

// Configure Dotenv
dotenv.config();

// Database Config
dbConnect();

const app = express();

// Middlewares
app.use(express.json()); //Bodyparser
app.use(morgan("dev"));

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(chalk.bgMagenta.bold.white(`Server Running On ${port} `));
});
