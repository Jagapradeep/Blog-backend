const express = require("express");
const router = express.Router();
const { Post } = require("../models/post");
const { User } = require("../models/user");
const { Like, validate } = require("../models/like");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const likes = await Like.find();
  let results = [];

  for (let like of likes) {
    const user = await User.findById(like.userId);
    let temp = {};
    temp.postId = like.postId;
    temp.userId = like.userId;
    temp.userName = user.name;
    results.push(temp);
  }

  res.send(results);
});

router.post("/:userId", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existing = await Like.findOneAndDelete({
    userId: req.params.userId,
    postId: req.body.postId,
  });
  if (existing) {
    return res.send("Disliked");
  }

  const user = await User.findById(req.params.userId);
  if (!user) return res.status(400).send("Invalid User ID");

  const post = await Post.findById(req.body.postId);
  if (!post) return res.status(400).send("Invalid Post ID");

  try {
    const like = new Like({
      userId: req.params.userId,
      postId: req.body.postId,
    });
    await like.save();
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }

  res.send("Success");
});

module.exports = router;
