const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/feed/:userId", async (req, res) => {
  const { userId } = req.params;
  
  try {
    const currentUser = await User.findById(userId);
    if (!currentUser) return res.status(404).json({ error: "User not found" });

    // Find all users the current user has NOT swiped on
    const potentialMatches = await User.find({
      _id: { $ne: userId, $nin: [...currentUser.likedProfiles, ...currentUser.dislikedProfiles] }
    });

    res.json(potentialMatches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
