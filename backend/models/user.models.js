import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  firends: [{ userName: String, userID: String }],
  trips: [{ owner: String, particpants: [{ userName: String }] }],
  content: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

const ArticleModel = mongoose.model("User", userSchema);
export default ArticleModel;
