import React from "react";
import { useLocation, Link } from "react-router-dom";

const Posts = (props) => {
  const posts = props.posts;
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => {
          console.log(post);
          return (
            <li key={post.author._id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
