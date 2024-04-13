import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      // required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=2048x2048&w=is&k=20&c=d1b4VHqWm1Gt8V148JOvaYSnyIvsFZEpGRCxLK-hGU4=",
    },
  },
  { timestamps: true }
);

export default mongoose.model("userModel", userSchema, "Users");

//this line exports a mongoose.model named userModel created from the UserSchema and associated with the collection named "Users" in the database.
