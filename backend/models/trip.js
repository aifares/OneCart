import mongoose from "mongoose";
// Define the user schema
const userSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tripTitle: {
    type: String,
    required: true,
    unique: true,
  },
  flight: {},
  hotel: {},
  tripGroup: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Create the User model
const User = mongoose.model("User", userSchema);
export default User;
