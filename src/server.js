'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/db');
const blogRoutes = require('./routes/blog.routes');
const { notFound, errorHandler } = require('./middleware/error');

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '..', 'public')));


app.use('/blogs', blogRoutes);


app.get('/health', (req, res) => res.json({ ok: true }));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(` http://localhost:${PORT}`));
})();