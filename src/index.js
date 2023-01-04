import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Posts from "./Posts";
//import Nav from "./Nav";
import Register from "./Register";
import Login from "./Login";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

//const ORI_URL = "https://strangers-things.herokuapp.com/api/";
//const COHORT =
// "https://strangers-things.herokuapp.com/api/2209-ftb-ET-WEB-AM/posts";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const element = <FontAwesomeIcon icon={faUsers} />;

  const fetchPosts = () => {
    fetch(
      "https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.posts);
        setPosts(result.data.posts);
      })
      .catch(console.error);
  };

  const exchangeTokenForUser = () => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    if (token) {
      fetch(
        "https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          const user = result.data;
          setUser(user);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    exchangeTokenForUser();
    fetchPosts();
  }, [token]);

  const logout = () => {
    window.localStorage.removeItem("token");
    setUser({});
  };

  return (
    <div>
      {user._id ? (
        <div>
          <h3> Hey welcome {user.username}!</h3>
          <button onClick={logout}>Logout</button>
        </div>
      ) : null}
      <header>
        <h1>
          Strangers Things&nbsp;
          <FontAwesomeIcon className="icon" icon={faUsers} />
        </h1>
      </header>

      <nav>
        <Link to="/posts">Posts ({posts.length})</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      {!user._id ? (
        <div className="auth-sec">
          <h1>Zuly's Auth Page</h1>

          <Register />

          <Login exchangeTokenForUser={exchangeTokenForUser} />
        </div>
      ) : null}
      <Routes>
        <Route path="/posts" element={<Posts posts={posts} token={token} />} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
      </Routes>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
ReactDOM.render(element, document.body);
