import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
//import Nav from "./Nav";

const ORI_URL = "https://strangers-things.herokuapp.com/api/";
const COHORT =
  "https://strangers-things.herokuapp.com/api/2209-ftb-ET-WEB-AM/posts";

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
              <Link to={`/posts/${post.author._id}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const App = () => {
  const [posts, setPosts] = useState([]);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = window.localStorage.getItem("token");
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
  }, []);

  const login = (ev) => {
    ev.preventDefault();
    console.log("login");
    fetch(
      "https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: loginUsername,
            password: loginPassword,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        const token = result.data.token;
        window.localStorage.setItem("token", token);
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
          .catch(console.error);
      })
      .catch((err) => console.log(err));
  };

  const register = (ev) => {
    ev.preventDefault();

    fetch(
      "https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: registerUsername,
            password: registerPassword,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          throw result.error;
        }
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch("https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json.data.posts));
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    setUser({});
  };

  return (
    <div>
      <h1>Strangers Things</h1>
      <nav>
        <Link to="/posts">Posts ({posts.length})</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <div className="auth-sec">
        <h1>Zuly's Auth Page</h1>
        <form onSubmit={register}>
          <input
            placeholder="username"
            value={registerUsername}
            onChange={(ev) => setRegisterUsername(ev.target.value)}
          />
          <input
            placeholder="password"
            value={registerPassword}
            onChange={(ev) => setRegisterPassword(ev.target.value)}
          />
          <button>Register</button>
        </form>

        <form onSubmit={login}>
          <input
            placeholder="username"
            value={loginUsername}
            onChange={(ev) => setLoginUsername(ev.target.value)}
          />
          <input
            placeholder="password"
            value={loginPassword}
            onChange={(ev) => setLoginPassword(ev.target.value)}
          />
          <button>Login</button>
        </form>
      </div>

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
