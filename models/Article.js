const { Schema, model, models } = require("mongoose");

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
    validate: [
      (value) => value.length <= 100,
      "Title cannot exceed 100 characters",
    ],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  imageURL: {
    type: String,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = models.Article || model("Article", articleSchema);
