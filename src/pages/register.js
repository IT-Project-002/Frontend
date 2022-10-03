import React, { useRef, useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import "../css/form.css";
import female1 from "../image/avatar/female1.png";
import female2 from "../image/avatar/female2.png";
import female3 from "../image/avatar/female3.png";
import male1 from "../image/avatar/male1.png";
import male2 from "../image/avatar/male2.png";
import male3 from "../image/avatar/male3.png";
import background from "../image/background/login.png";
import Alert from "@mui/material/Alert";

const NAME_REG = new RegExp(/^[A-Z0-9][A-z0-9-_]{3,14}$/i);
const EMAIL_REG = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
const PWD_REG = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/i);
export const validName = (str = "") => NAME_REG.test(str);
export const validEmail = (str = "") => EMAIL_REG.test(str);
export const validPwd = (str = "") => PWD_REG.test(str);
export const validMatch = (str1 = "", str2 = "") => str1 === str2;

function Registration() {
  const userRef = useRef();
  // const errRef = useRef();
  const history = useNavigate();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  // setting a focus on username input when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Avatar selection
  const handleClick = (event) => {
    setAvatar(event.target.alt);

  };

  const handleSubmit = (e) => {
    // prevent page being refresh
    e.preventDefault();

    // check form validation
    if (validName && validEmail && validPwd && validPwd && avatar) {
      const userInfo = { username, email, password, matchPwd, bio, avatar };
      console.log(userInfo);
      history("/user/login");
      fetch("/users/register", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(userInfo),
      })
        .then((response) => {
          console.log("hi:", response);
          history("/user/login");
        })
        .then((userInfo) => {
          console.log("Success:", userInfo);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="layout-register">
      <div className="register-container">
        <h1>New to this site?</h1>
        <h1>Let's get you started!</h1>
        <form method="post" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="input-container">
            <i>
              <PersonIcon />
            </i>
            <input
              type="text"
              ref={userRef}
              placeholder="Name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {username && !validName(username) ? (
            <Alert className="register-alert" severity="warning" variant="outlined">
              3 to 14 characters. Letters, numbers, underscores, hyphens allowed.
            </Alert>
          ) : null}

          {/* Email */}
          <div className="input-container">
            <i>
              <EmailIcon />
            </i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {email && !validEmail(email) ? (
            <Alert className="register-alert" severity="warning" variant="outlined">
              Valid email prefixes: example@mail.com
            </Alert>
          ) : null}

          {/* Password */}
          <div className="input-container">
            <i>
              <LockIcon />
            </i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {password && !validPwd(password) ? (
            <Alert className="register-alert" severity="warning" variant="outlined">
              8 to 24 characters. Must include uppercase, lowercase letters and a number.
            </Alert>
          ) : null}

          {/* Confirm Password */}
          <div className="input-container">
            <i>
              <LockIcon />
            </i>
            <input
              type="password"
              placeholder="Comfirmed Password"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              required
            />
          </div>
          {password && !validMatch(password, matchPwd) ? (
            <Alert className="register-alert" severity="warning" variant="outlined">
              Passwords did not match
            </Alert>
          ) : null}

          {/* Bio */}
          <div className="input-container">
            <i>
              <BorderColorIcon />
            </i>
            <textarea
              type="text"
              placeholder="Tell us a bit more about you…"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button className="register-button" type="submit">
            Sign Up
          </button>
        </form>
        <a className="register-signin" href="/user/login">Already has an account?</a>
      </div>
      <div className="bubble-container">
        <h2 className="avatar-remindar">
          Pick your profile picture…        
        </h2>
        {!avatar ? (
            <Alert className="avatar-alert" severity="warning" variant="outlined">
                Must pick profile picture
            </Alert>
          ) : null}
        <img
          id="female1"
          src={female1}
          alt="female1"
          className="avatar2"
          onClick={handleClick}
        ></img>
        <img
          id="female2"
          src={female2}
          alt="female2"
          className="avatar1"
          onClick={handleClick}
        ></img>
        <img
          id="female3"
          src={female3}
          alt="female3"
          className="avatar2"
          onClick={handleClick}
        ></img>
        <img
          id="male1"
          src={male1}
          alt="male1"
          className="avatar1"
          onClick={handleClick}
        ></img>
        <img
          id="male2"
          src={male2}
          alt="male2"
          className="avatar2"
          onClick={handleClick}
        ></img>
        <img
          id="male3"
          src={male3}
          alt="male3"
          className="avatar1"
          onClick={handleClick}
        ></img>
        <h2 className="avatar-setup-msg">Now…Let's set up your own space!</h2>
      </div>
      <img className="login-background" src={background} alt=""></img>
    </div>
  );
}

export default Registration;
