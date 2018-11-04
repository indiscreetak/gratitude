const express = require('express');
const app = express();
const mongoose = require('mongoose');

const db = require('./config/keys').mongoURI;
const posts = require('./routes/posts');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected...'));

app.use('/api/posts', posts);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Express Server listening on port ${port}....`)
);
