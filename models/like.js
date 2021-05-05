const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Like = mongoose.model(
  "Like",
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
  })
);

function validateLike(like) {
  const schema = Joi.object({
    postId: Joi.objectId().required(),
  });
  return schema.validate(like);
}

exports.Like = Like;
exports.validate = validateLike;
