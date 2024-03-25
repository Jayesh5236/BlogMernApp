import mongoose from "mongoose";
import chalk from "chalk";

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      chalk.bgGreen.bold(`Connected To The Database ${connect.connection.host}`)
    );
  } catch (error) {
    console.log(chalk.bgRedBright.bold(error));
  }
};


export default dbConnect