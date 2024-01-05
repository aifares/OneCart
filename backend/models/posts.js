import mongoose from "mongoose";
// Define the user schema
const postSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: String,
      required: false,
    },
  ],
  body: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  correspondingTrip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trips",
  },
});

// Create the User model
const Post = mongoose.model("Post", postSchema);
export default Post;
