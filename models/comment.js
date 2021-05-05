const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  })
);

function validateComment(like) {
  const schema = Joi.object({
    postId: Joi.objectId().required(),
    comment: Joi.string().required(),
  });
  return schema.validate(like);
}

exports.Comment = Comment;
exports.validate = validateComment;
