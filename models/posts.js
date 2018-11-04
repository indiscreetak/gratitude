const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  body: { type: String, required: true },
  tags: [String],
  date: { type: Number, default: Date.now() }
});

module.exports = posts = mongoose.model('posts', PostSchema);
