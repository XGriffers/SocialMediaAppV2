import mongoose from "mongoose";

// user deets
const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true }, // login name
    password: { type: String, required: true }, // hashed pass
    firstname: { type: String, required: true }, // first name
    lastname: { type: String, required: true }, // last name
    isAdmin: { type: Boolean, default: false }, // boss or nah
    profilePicture: String, // profile pic
    coverPicture: String, // cover pic
    about: String, // bio
    livesIn: String, // where they at
    worksAt: String, // job
    relationship: String, // dating status
    country: String, // home turf
    followers: { type: [String], default: [] }, // fans
    following: { type: [String], default: [] }, // peeps they stalk
  },
  { timestamps: true } // when they joined
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;