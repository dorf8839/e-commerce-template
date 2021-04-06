import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

function Login(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value, error: "" });
  };

  function login(e) {
    e.preventDefault();

    const { username, password } = user;
    if (!username || !password) {
      return setMessage({ error: "Fill all fields!" });
    }
    props.context.login(username, password)
      .then((loggedIn) => {
        if (!loggedIn) {
          setMessage({ error: "Invalid Credentials" });
        }
      })
  };

  return !props.context.user ? (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Login</h4>
        </div>
      </div>
      <br />
      <br />
      <form onSubmit={login}>
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            {message.error && (
              <div className="notification is-danger">{message.error}</div>
            )}
            <div className="field">
              <label className="label">Email: </label>
              <input
                className="input"
                type="email"
                name="username"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="field">
              <label className="label">Password: </label>
              <input
                className="input"
                type="password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="field is-clearfix">
              <button
                className="button is-primary is-outlined is-pulled-right"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  ) : (
    <Redirect to="/products" />
  );
  
}

export default withContext(Login);