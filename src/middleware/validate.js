'use strict';
const mongoose = require('mongoose');


function validateObjectId(paramName) {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `Invalid ${paramName}` });
    }
    next();
  };
}


function validateCreate(req, res, next) {
  const { title, body } = req.body || {};
  const errors = [];

  if (!title || typeof title !== 'string' || !title.trim()) errors.push('title is required');
  if (!body || typeof body !== 'string' || !body.trim()) errors.push('body is required');

  if (errors.length) return res.status(400).json({ message: 'Validation error', errors });
  next();
}


function validateUpdate(req, res, next) {
  const { title, body, author } = req.body || {};
  const errors = [];

  if (!req.body || Object.keys(req.body).length === 0) errors.push('request body cannot be empty');
  if (title !== undefined && (!title || !String(title).trim())) errors.push('title must be non-empty');
  if (body !== undefined && (!body || !String(body).trim())) errors.push('body must be non-empty');
  if (author !== undefined && typeof author !== 'string') errors.push('author must be a string');

  if (errors.length) return res.status(400).json({ message: 'Validation error', errors });
  next();
}

module.exports = { validateObjectId, validateCreate, validateUpdate };