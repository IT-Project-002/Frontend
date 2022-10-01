import "../css/profile.css";
import female1 from "../image/avatar/female1.png";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { useState, useEffect } from "react";

export default function Profile() {
  const access_token = sessionStorage.getItem("access_token");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
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
        setData(dat);
        setLoading(false);
      });
  }, [access_token]);
  return (
    <>
      {loading ? (
        <CircularProgress className="layout-profile" />
      ) : (
        <div className="layout-profile">
          <div className="profile-photo-container">
            <img src={female1} alt="female1"></img>
          </div>
          <div className="edit-container">
            <div className="edit-left-container">
              <div className="fillin-input-container">
                <h2>User Email</h2>
                {/* <PersonIcon /> */}
                <input type="text" readOnly value={data["userEmail"]}></input>
              </div>
              <div className="fillin-input-container">
                {/* <BorderColorIcon /> */}
                <h2>User Name</h2>
                <input type="text" defaultValue={data["username"]}></input>
              </div>
              <div className="fillin-input-container">
                <h2>Want to change the password?</h2>
                {/* <BorderColorIcon /> */}
                <input type="password" placeholder="Enter new password"></input>
              </div>
              <div className="fillin-input-container">
                <h2>Confirm new password</h2>
                {/* <BorderColorIcon /> */}
                <input
                  type="password"
                  placeholder="Confirm new password"
                ></input>
              </div>
            </div>

            <div className="edit-right-container">
              <h2>Make Email visible to anyone on the internet?</h2>
              <form>
                <div className="selector-container">
                  {/* <ToggleOffIcon /> */}
                  <select id="contactSelect">
                    <option defaultValue="selected">Public</option>
                    <option>Private</option>
                  </select>
                </div>
              </form>
              <div className="fillin-input-container">
                {/* <BorderColorIcon /> */}
                <h2>User Bio</h2>
                <input type="text" defaultValue={data["Bio"]}></input>
              </div>
            </div>
            <div className="buttonBox">
              <button>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
