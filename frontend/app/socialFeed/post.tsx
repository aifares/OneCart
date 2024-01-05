"use client";
import React, { useState } from "react";
import useSWR, { mutate } from "swr"; // Import mutate from SWR

interface PostProps {
  data: {
    _id: string;
    title: string;
    body: string;
    comments: string[];
  };
}

const Post: React.FC<PostProps> = ({ data }) => {
  const { title, body, comments, _id } = data;
  const [newComment, setNewComment] = useState("");
  const [postComments, setPostComments] = useState(comments);

  const postComment = async (comment: string, postId: string) => {
    try {
      const response = await fetch("http://localhost:9000/api/v1/addComment", {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, postComment: comment }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Trigger a re-fetch for the specific post key
      mutate(`http://localhost:9000/api/v1/getAllPosts/`);

      const updatedComments = [...postComments, comment];
      setPostComments(updatedComments);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      postComment(newComment, _id);
      setNewComment("");
    }
  };

  return (
    <div className="post bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-700">{body}</p>

      {/* Comment Section */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Comments:</h3>
        <ul>
          {postComments.map((comment, index) => (
            <li key={index} className="text-gray-600 mb-2">
              {comment}
            </li>
          ))}
        </ul>
        {/* Input for New Comment */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={handleCommentChange}
            className="border rounded p-2 w-full"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
