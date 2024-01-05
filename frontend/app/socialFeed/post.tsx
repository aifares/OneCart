import React from "react";

interface PostProps {
  title: string;
  body: string;
}

const Post: React.FC<PostProps> = ({ title, body }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-700">{body}</p>
    </div>
  );
};

export default Post;
