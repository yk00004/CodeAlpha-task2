const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['like', 'comment', 'follow'], required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // optional for like/comment
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);


module.exports = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
