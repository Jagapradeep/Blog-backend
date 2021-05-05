const _ = require("lodash");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Post, validate } = require("../models/post");

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send("There is no post with the given ID.");
  res.send(post);
});

router.post("/:userId", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = _.pick(req.body, ["title", "content", "tags"]);
  post.authorId = req.params.userId;
  post = new Post(post);
  post = await post.save();

  res.send(_.pick(post, ["_id"]));
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, content, tags } = req.body;

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content, tags },
    { new: true }
  );
  if (!post) return res.status(404).send("There is no post with the given ID.");

  res.send(post);
});

module.exports = router;
