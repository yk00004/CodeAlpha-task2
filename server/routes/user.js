const express = require('express');
const User = require('../model/User');
const router = express.Router();
const auth = require('../middlewere/auth');

// FOLLOW user
router.put('/follow/:id', auth, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user);

    if (!targetUser.followers.includes(currentUser._id)) {
      targetUser.followers.push(currentUser._id);
      currentUser.following.push(targetUser._id);
      await targetUser.save();
      await currentUser.save();
      res.json({ msg: "Followed" });
    } else {
      res.status(400).json({ msg: "Already following" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UNFOLLOW user
router.put('/unfollow/:id', auth, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user);

    targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUser._id.toString());
    currentUser.following = currentUser.following.filter(id => id.toString() !== targetUser._id.toString());

    await targetUser.save();
    await currentUser.save();

    res.json({ msg: "Unfollowed" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;