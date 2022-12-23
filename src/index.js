import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Posts from "./Posts";
//import Nav from "./Nav";
import Register from "./Register";
import Login from "./Login";

//const ORI_URL = "https://strangers-things.herokuapp.com/api/";
//const COHORT =
// "https://strangers-things.herokuapp.com/api/2209-ftb-ET-WEB-AM/posts";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

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
          Ciao {user.username}! <button onClick={logout}>Logout</button>
        </div>
      ) : null}

      <h1>Strangers Things</h1>
      <i class="fas fa-cloud"></i>
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
        <Route path="/posts" element={<Posts posts={posts} />} />
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
