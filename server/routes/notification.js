const router = require('express').Router();
const Notification = require('../model/Notification');
const auth = require('../middlewere/auth');

// Get notifications for a user
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ receiver: req.user })
      .populate('sender', 'username profileImage')
      .populate('post', 'caption')
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ msg: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/', auth, async (req, res) => {
  try {
    const { sender,receiver, type, post } = req.body;

    if (!receiver || !type) {
      return res.status(400).json({ msg: 'Receiver and type are required' });
    }

    const notification = new Notification({
      sender: sender,
      receiver,
      type,
      post
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
