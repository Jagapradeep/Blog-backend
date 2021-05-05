const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Post } = require("../models/post");
const { User } = require("../models/user");
const { Comment, validate } = require("../models/comment");

router.get("/:userId", async (req, res) => {
  const comments = await Comment.find({ userId: req.params.userId });
  let results = [];

  for (let comment of comments) {
    const post = await Post.findById(comment.postId);
    let temp = {};
    temp.postName = post.title;
    temp.comment = comment.comment;
    results.push(temp);
  }

  res.send(results);
});

router.post("/:userId", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.params.userId);
  if (!user) return res.status(400).send("Invalid User ID");

  const post = await Post.findById(req.body.postId);
  if (!post) return res.status(400).send("Invalid Post ID");

  try {
    const comment = new Comment({
      postId: req.body.postId,
      userId: req.params.userId,
      comment: req.body.comment,
    });
    await comment.save();
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }

  res.send("Success");
});

module.exports = router;
