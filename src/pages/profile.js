import "../css/profile.css";
import female1 from "../image/avatar/female1.png";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { useState, useEffect } from "react";

const NAME_REG = new RegExp(/^[A-Z0-9][A-z0-9-_]{3,14}$/i);
const PWD_REG = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/i);
export const validName = (str = "") => NAME_REG.test(str);
export const validPwd = (str = "") => PWD_REG.test(str);
export const validMatch = (str1 = "", str2 = "") => str1 === str2;

export default function Profile() {
  const access_token = sessionStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);
  /* Inmutable */
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  /* mutable */
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [bio, setBio] = useState("");
  const [showEmail, setShow] = useState("");

  useEffect(() => {
    fetch("/users/profile", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + access_token,
      },
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        console.log(res);
        if (res.status === 401) {
          sessionStorage.removeItem("access_token");
          window.location.href = window.location.origin + "/user/login";
        } else {
          return res.json();
        }
      })
      .then((dat) => {
        console.log(dat);
        // setData(dat);
        setAvatar(dat.Avatar);
        setEmail(dat.userEmail);
        setName(dat.username);
        setBio(dat.Bio);
        setShow(dat.hide_email);
        setLoading(false);
      });
  }, [access_token]);

  /* 上传成功后reload the page*/
  const handleSubmit = (e) => {
    e.preventDefault();
    const updateInfo = {
      avatar,
      username,
      email,
      password,
      bio,
      showEmail,
    };
    console.log(updateInfo);
  };

  return (
    <>
      {loading ? (
        <CircularProgress className="layout-profile" />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="layout-profile">
            <div className="profile-photo-container">
              <img src={female1} alt="female1"></img>
            </div>

            <div className="edit-container">
              <div className="edit-left-container">
                <div className="fillin-input-container">
                  <h2>User Email (ReadOnly) </h2>
                  {/* <PersonIcon /> */}
                  <input type="text" readOnly value={email}></input>
                </div>
                <div className="fillin-input-container">
                  <h2>User Name</h2>
                  <input
                    type="text"
                    defaultValue={username}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                {username && !validName(username) ? (
                  <p id="uidnote" className="instructions">
                    3 to 14 characters.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
                ) : null}
                <div className="fillin-input-container">
                  <h2>Want to change the password?</h2>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                {password && !validPwd(password) ? (
                  <p id="uidnote" className="instructions">
                    8 to 24 characters.
                    <br />
                    Must include uppercase, lowercase letters and a number.
                    <br />
                  </p>
                ) : null}
                <div className="fillin-input-container">
                  <h2>Confirm new password</h2>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={matchPwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                  ></input>
                </div>
              </div>
              {password && !validMatch(password, matchPwd) ? (
                <p id="uidnote" className="instructions">
                  Passwords did not match
                </p>
              ) : null}
              <div className="edit-right-container">
                <h2>Make Email visible to anyone on the internet?</h2>
                <div className="selector-container">
                  <select
                    id="contactSelect"
                    value={showEmail}
                    onChange={(e) => setShow(e.target.value)}
                  >
                    {!showEmail ? (
                      <>
                        <option>Public</option>
                        <option>Private</option>
                      </>
                    ) : (
                      <>
                        <option>Private</option>
                        <option>Public</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="fillin-input-container">
                  <h2>User Bio</h2>
                  <input
                    type="text"
                    defaultValue={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="buttonBox">
                <button type="submit">Save Changes</button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
