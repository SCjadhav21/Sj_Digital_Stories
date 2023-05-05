const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  image: { required: true, type: String },
  userId: { required: true, type: String },
  comment: {
    type: [String],
    default: [],
  },
  like: {
    type: Number,
    default: 0,
  },
  description: { type: String },
});

const PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel };
