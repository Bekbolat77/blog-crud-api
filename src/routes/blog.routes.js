'use strict';
const router = require('express').Router();

const c = require('../controllers/blog.controller');
const { validateObjectId, validateCreate, validateUpdate } = require('../middleware/validate');

router.post('/', validateCreate, c.createBlog);
router.get('/', c.getAllBlogs);
router.get('/:id', validateObjectId('id'), c.getBlogById);
router.put('/:id', validateObjectId('id'), validateUpdate, c.updateBlogById);
router.delete('/:id', validateObjectId('id'), c.deleteBlogById);

module.exports = router;