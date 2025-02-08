const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bio: String,
  photos: [String], // URLs of profile pictures
  interests: [String],
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
  likedProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikedProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

UserSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", UserSchema);
