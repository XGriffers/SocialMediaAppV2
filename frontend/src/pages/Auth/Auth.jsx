import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpass: "",
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState(initialState);
  const [confirmPass, setConfirmPass] = useState(true);

  const resetForm = () => {
    setData(initialState);
    setConfirmPass(true);
    console.log("form wiped yo");
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmPass(true);
    if (isSignUp) {
      if (data.password === data.confirmpass) {
        dispatch(signUp(data, navigate));
        console.log("signing up", data);
      } else {
        setConfirmPass(false);
        console.log("passwords don’t match oof");
      }
    } else {
      dispatch(logIn(data, navigate));
      console.log("logging in", data);
    }
  };

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="logo" />
        <div className="Webname">
          <h1>Social Media App</h1>
        </div>
      </div>
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}
          {isSignUp && (
            <div>
              <input
                required
                type="email"
                className="infoInput"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                value={data.confirmpass}
                onChange={handleChange}
              />
            )}
          </div>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Passwords Must Match
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer", textDecoration: "underline" }}
              onClick={() => {
                resetForm();
                setIsSignUp(!isSignUp);
              }}
            >
              {isSignUp ? "Got an account? Login." : "Need one? Sign Up."}
            </span>
            <button className="button infoButton" type="submit" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;