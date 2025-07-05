const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  bio: String,
  profileImage: {
    type:String,
    default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
