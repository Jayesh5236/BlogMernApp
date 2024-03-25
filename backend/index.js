import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const app = express();

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(chalk.bgMagenta.bold.white(`Server Running On ${port} `));
});
