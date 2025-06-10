const express = require('express');
const router = express.Router();
const auth = require('../middlewere/auth');
const Message = require('../model/Message');

// 1. Send a new message (and save to DB)
router.post(
  '/message',
  auth,
  async (req, res) => {
    try {
      const { to, text } = req.body;
      if (!to || !text) return res.status(400).json({ msg: 'Missing fields' });

      const msg = new Message({
        from: req.user._id,
        to,
        text
      });
      await msg.save();
      res.status(201).json(msg);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// 2. Get chat history between two users
router.get(
  '/history/:otherUserId',
  auth,
  async (req, res) => {
    try {
      const { otherUserId } = req.params;
      const messages = await Message.find({
        $or: [
          { from: req.user._id, to: otherUserId },
          { from: otherUserId, to: req.user._id }
        ]
      })
      .sort('createdAt');
      res.json(messages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
