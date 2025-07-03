const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// POST /api/comments
router.post('/', auth, async (req, res) => {
  const { blogId, text, parentComment } = req.body;
  const comment = await Comment.create({
    blogId,
    userId: req.user.id,
    text,
    parentComment: parentComment || null
  });
  res.status(201).json(comment);
});

// GET /api/comments/:blogId
router.get('/:blogId', async (req, res) => {
  const comments = await Comment.find({ blogId: req.params.blogId }).populate('userId');
  res.json(comments);
});

module.exports = router;
