const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');

// @route GET /api/posts
// @desc GET ALL POSTS
// @access PUBLIC

router.get('/', (req, res) => {
  Posts.find({})
    .sort({ date: 'asc' })
    .then(posts => {
      if (posts.length) {
        res.json({ posts });
      } else {
        res.json({ msg: 'No posts found.' });
      }
    })
    .catch(err =>
      res.status(400).json({ msg: 'Something Went Wrong.', err: err })
    );
});
// @route POST /api/posts
// @desc Add a post to db.
// @access PUBLIC

router.post('/', (req, res) => {
  // if (post) {
  //   res.json({ msg: 'You double posted' });
  // } else {
  let posted = {};

  if (req.body.body) posted.body = req.body.body;
  if (req.body.tags) posted.tags = req.body.tags;

  new Posts(posted)
    .save()
    .then(post => res.json({ msg: 'Success', post: post }))
    .catch(err => res.json({ msg: 'Error' }));
  // }
});

// @route DELETE /api/posts/:id
// @desc Delete a post by ID.
// @access PUBLIC

router.delete('/:id', (req, res) => {
  Posts.findByIdAndDelete(req.params.id)
    .then(post => {
      res.json({ msg: 'Success', postId: post.id, postBody: post.body });
    })
    .catch(() => res.json({ msg: 'Post Not Found' }));
});

module.exports = router;
