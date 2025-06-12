const express = require("express");
const User = require("../model/User");
const router = express.Router();
const auth = require("../middlewere/auth");
const upload = require("../middlewere/upload"); // multer middleware
const Notification = require("../model/Notification");

// FOLLOW user
router.put("/follow", auth, async (req, res) => {
  try {
    const { userId, followId } = req.body;
    const targetUser = await User.findById(followId);
    const currentUser = await User.findById(userId);

    if (!targetUser.followers.includes(currentUser._id)) {
      targetUser.followers.push(currentUser._id);
      currentUser.following.push(targetUser._id);
      await targetUser.save();
      await currentUser.save();
      if (userId !== followId) {
        await Notification.create({
          sender: userId,
          receiver: followId,
          type: "follow",
        });
      }

      res.json({ msg: "Followed" });
    } else {
      res.status(400).json({ msg: "Already following" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put(
  "/:id/profile-image",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { profileImage: req.file ? req.file.path : "" },
        { new: true }
      );

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// UNFOLLOW user
router.put("/unfollow/:id", auth, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user);

    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== targetUser._id.toString()
    );

    await targetUser.save();
    await currentUser.save();

    res.json({ msg: "Unfollowed" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/search", async (req, res) => {
  const query = req.query.query;
  console.log(query);

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
      ],
    }).select("username name profileImage");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/suggestions/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);

    const excludedIds = [req.params.id, ...currentUser.following];

    const suggestions = await User.find({ _id: { $nin: excludedIds } })
      .select("-password")
      .limit(10);

    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
