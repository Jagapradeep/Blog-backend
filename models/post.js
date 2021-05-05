const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
  })
);

function validatePost(post) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).label("Title").required(),
    content: Joi.string().label("Content").required(),
    tags: Joi.array(),
  });
  return schema.validate(post);
}

exports.Post = Post;
exports.validate = validatePost;
