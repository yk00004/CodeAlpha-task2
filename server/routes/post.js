const express = require('express');
const router = express.Router();
const upload = require('../middlewere/upload');
const Post = require('../model/Post');
const auth = require('../middlewere/auth');

// CREATE POST
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const post = new Post({
      user: req.user,
      caption: req.body.caption,
      image: req.file ? req.file.path : ''
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL POSTS (Feed)
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username profileImage')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user;

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// COMMENT on post
router.post('/comment/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = {
      user: req.user,
      text: req.body.text,
    };
    post.comments.push(comment);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// GET /posts/user/:userId -profle page
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId }).populate('user', 'username profileImage');
    // console.log(posts);
    
    res.send(posts)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
