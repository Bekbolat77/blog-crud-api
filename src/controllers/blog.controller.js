'use strict';
const Blog = require('../models/Blog');


async function createBlog(req, res, next) {
  try {
    const { title, body, author } = req.body;
    const blog = await Blog.create({ title, body, author });
    return res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
}


async function getAllBlogs(req, res, next) {
  try {
    const blogs = await Blog.find().sort('-createdAt');
    return res.json(blogs);
  } catch (err) {
    next(err);
  }
}

// GET /blogs/:id
async function getBlogById(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    return res.json(blog);
  } catch (err) {
    next(err);
  }
}

// PUT /blogs/:id
async function updateBlogById(req, res, next) {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Blog not found' });
    return res.json(updated);
  } catch (err) {
    next(err);
  }
}


async function deleteBlogById(req, res, next) {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Blog not found' });
    return res.json({ message: 'Blog deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById };