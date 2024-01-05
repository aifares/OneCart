import express from "express";
const router = express.Router();
import Post from "../models/posts.js";
// Route for Save a new Book
router.post("/createPost", async (req, res) => {
  const { author, body, title } = req.body;
  try {
    const newPost = new Post({
      author,
      body,
      title,
    });
    newPost.save();
    res.status(201).json("User Saved");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getAllPosts", async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find();

    // Return the posts as JSON
    res.json(posts);
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
});

router.patch("/addComment", async (req, res) => {
  const postId = req.body.postId;
  const postComment = req.body.postComment;

  try {
    // Find the post by ID and update the comments list
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: postComment } },
      { new: true } // Returns the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json(updatedPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
