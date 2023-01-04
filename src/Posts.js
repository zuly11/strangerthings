import React from "react";
import { useLocation, Link } from "react-router-dom";

//import { createPost } from "./Create";

const Posts = (props) => {
  const posts = props.posts;
  const token = props.token;
  return (
    <div>
      <h1>Posts</h1>
      <form></form>
      <p>Create a post here:</p>

      <button onClick={() => createPost(token)}>Create Post</button>

      <ul>
        {posts.map((post) => {
          console.log(post);
          return (
            <ul className="cards">
              <li
                key={post._id}
                className={post.isAuthor ? "myPost" : "singlePost"}
              >
                <Link to={`/posts/${post.id}`} className="link">
                  <h3>{post.title}</h3>
                </Link>
                <p>{post.description}</p>
                <p>Price: {post.price}</p>
                <p>Location: {post.location}</p>
                <p>Date Posted: {post.updatedAt}</p>
                <p>Author: {post.author.username}</p>
                {post.isAuthor ? <button>Edit</button> : null}
              </li>
            </ul>
          );
        })}
      </ul>
    </div>
  );
};

export const createPost = (token) => {
  fetch("https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title: "Finger Hugs and/or Smothering Bear Hugs",
        description: "To whomever needs a hug",
        price: "priceless",
        willDeliver: true,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
};

export default Posts;
