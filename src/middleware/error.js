'use strict';

function notFound(req, res) {
  return res.status(404).json({ message: `Not Found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) { 
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation failed', details: err.message });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  console.error(err);
  return res.status(500).json({ message: 'Server error', error: err.message });
}

module.exports = { notFound, errorHandler };