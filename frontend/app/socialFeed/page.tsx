// App.js
"use client";
import React, { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import fetcher from "../utils/fetcher";
import Post from "./post";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const SocialFeed = ({}) => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  const postData = async ({ author, body, title }) => {
    console.log(title);
    try {
      const response = await fetch("http://localhost:9000/api/v1/createPost", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, body, title }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      // Log the response from the server
      console.log("Post successful:", result);

      // Return the response so it can be accessed in the calling function
      return result;
    } catch (error) {
      console.error("Error:", error.message);
      // If there's an error, return a default value (e.g., null)
      return null;
    }
  };

  const { data, trigger, isMutating } = useSWRMutation(
    `http://localhost:9000/api/v1/getAllPosts`,
    fetcher
  );

  const [newPost, setNewPost] = useState({ title: "", content: "" });

  useEffect(() => {
    trigger();
  }, []);

  const handleNewPostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post new data and wait for the response
      const res = await postData({
        author: session.data?.user?.email,
        title: newPost.title,
        body: newPost.content,
      });

      // Check if the response is okay
      if (res) {
        // Log the successful response
        console.log("Post created successfully:", res);

        // Trigger a re-fetch of the posts
        trigger();
      } else {
        console.error("Post creation response is undefined.");
      }
    } catch (error) {
      // Log any unexpected errors
      console.error("Error submitting new post:", error.message);
    }

    // Clear the new post input
    setNewPost({ title: "", content: "" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-8">Social Media App</h1>
      <label className="block text-lg font-semibold mb-2">
        Write a new post
      </label>
      <input
        type="text"
        name="title"
        value={newPost.title}
        onChange={handleNewPostChange}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded-md mb-2"
      />
      <textarea
        name="content"
        value={newPost.content}
        onChange={handleNewPostChange}
        placeholder="Content"
        className="w-full p-2 border border-gray-300 rounded-md mb-2"
      />
      <button
        onClick={handleNewPostSubmit}
        type="submit"
        className="bg-green-500 text-white p-2 rounded-md"
      >
        Submit Post
      </button>

      {!isMutating
        ? data && data.map((post) => <Post data={post} />)
        : "Data Loading"}
    </div>
  );
};

export default SocialFeed;
