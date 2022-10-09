import "../css/market.css";
import "../css/itemListB.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import female1 from "../image/avatar/female1background.png";
import female2 from "../image/avatar/female2background.png";
import female3 from "../image/avatar/female3background.png";
import male1 from "../image/avatar/male1background.png";
import male2 from "../image/avatar/male2backgound.png";
import male3 from "../image/avatar/male3background.png";
import background from "../image/background/marketplace.png";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Cards from "../components/itemListB";

export default function Market() {
  const access_token = sessionStorage.getItem("access_token");
  const [data, setData] = useState({});
  const avatar = data["Avatar"];
  const [loading, setLoading] = useState(true);
  const { userID } = useParams();

  useEffect(() => {
    fetch("/users/market" + userID, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + access_token,
      },
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        // console.log({res});
        if (res.status === 401) {
          sessionStorage.removeItem("access_token");
          window.location.href = window.location.origin + "/user/login";
        } else {
          return res.json();
        }
      })
      .then((dat) => {
        // console.log(dat);
        setData(dat);
        setLoading(false);
      });
  }, [access_token]);

  return (
    <>
      {loading ? (
        <CircularProgress className="loading" />
      ) : (
        <div className="layout-market">
          {/* Aavatar matching */}
          <div className="user-avatar-container">
            {avatar === "female1" ? (
              <img className="user-avatar" src={female1} alt="female1"></img>
            ) : null}
            {avatar === "female2" ? (
              <img className="user-avatar" src={female2} alt="female2"></img>
            ) : null}
            {avatar === "female3" ? (
              <img className="user-avatar" src={female3} alt="female3"></img>
            ) : null}
            {avatar === "male1" ? (
              <img className="user-avatar" src={male1} alt="male1"></img>
            ) : null}
            {avatar === "male2" ? (
              <img className="user-avatar" src={male2} alt="male2"></img>
            ) : null}
            {avatar === "male3" ? (
              <img className="user-avatar" src={male3} alt="male3"></img>
            ) : null}
          </div>

          {/* User Intro & Upload button */}
          <div className="user-intro-container">
            <a href="/user/upload">
              <AddAPhotoOutlinedIcon />
            </a>
            <p>Click to upload more items.</p>
            <hr className="divider"></hr>
            <h1>{data["username"]}'s</h1>
            <h1>Marketplace</h1>
            <p>{data["Bio"]}</p>
            <img
              className="user-avatar-bg"
              src={background}
              alt="background"
            ></img>
          </div>

          {/* User Item Collections */}
          <div className="user-collection-container">
            <Cards data={data} />
          </div>
        </div>
      )}
    </>
  );
}
