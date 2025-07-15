import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const blog = new Blog({
      user: req.userId,
      title,
      content,
      image
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog' });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1');
    const limit = 6;
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('user', 'name');

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};
