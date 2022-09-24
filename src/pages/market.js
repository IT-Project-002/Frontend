import "../css/market.css";
import female1 from "../image/avatar/female1background.png";
import female2 from "../image/avatar/female2background.png";
import female3 from "../image/avatar/female3background.png";
import male1 from "../image/avatar/male2background.png";
import male2 from "../image/avatar/male2background.png";
import male3 from "../image/avatar/male3background.png";
import EditIcon from '@mui/icons-material/Edit';
import Cards from "../components/itemListB";
import "../css/itemListB.css";
import React from "react";

import item1 from "../image/items/item1.png";
import item2 from "../image/items/item2.png";
import item3 from "../image/items/item3.png";
import item4 from "../image/items/item4.png";
import item5 from "../image/items/item5.png";
import background from "../image/background/marketplace.png";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import React, { useState, useEffect } from "react";

export default function Market() {
  const access_token = sessionStorage.getItem("access_token");
  const [data, setData] = useState({});
  const avatar = data["Avatar"];

  useEffect(() => {
    fetch("/users/market", {
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
          window.location.href = window.location.origin +"/user/login";
        } else {
          return res.json();
        }
      })
      .then((dat) => {
        console.log(dat);
        setData(dat);
      });
  }, [access_token]);
  return (
    <div className="layout-market">

      {/* User Aavatar */}
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
        <p>
          Lorem ipsum dolor sit amet,data consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum.{" "}
        </p>
        <img className="user-avatar-bg" src={background} alt="background"></img>
      </div>

      {/* User Item Collections */}
      <div className="user-collection-container">
          <Cards />
      </div>
    </div>
  );
}
