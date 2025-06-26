const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Create blog
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newBlog = new Blog({
      ...req.body,
      author: req.user.userId
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ msg: 'Blog creation failed', error: err.message });
  }
});
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error while posting blog' });
  }
});

// Get all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.find().populate('author', 'username').sort({ createdAt: -1 });
  res.json(blogs);
});

// Get single blog
router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'username');
  res.json(blog);
});

// Update blog
router.put('/:id', authMiddleware, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.author.toString() !== req.user.userId) {
    return res.status(403).json({ msg: "Not authorized" });
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBlog);
});

// Delete blog
router.delete('/:id', authMiddleware,adminMiddleware, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.author.toString() !== req.user.userId) {
    return res.status(403).json({ msg: "Not authorized" });
  }
  await blog.remove();
  res.json({ msg: 'Blog deleted' });
});

module.exports = router;
