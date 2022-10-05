import "../css/item.css";
import Slider from "../components/imageSlider";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Item() {
const access_token = sessionStorage.getItem("access_token");
  const { itemId } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("/users/item/"+itemId, {
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
         console.log(dat);
         setData(dat);
      });
  }, [access_token]);
  return (
    <div className="layout-item">
      <div className="item-img">
        <Slider />
      </div>
      <div className="item-desc-container">
        <h1 className="item-name">
          Purely Hand-made mug, Perfectly for hot tea in winter.
        </h1>
        <h1 className="item-price">AU$49.00+</h1>
        <p className="item-desc">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et ut labore et dolore magna
          aliquyam erat.
        </p>
        <p className="item-status">Di Lu's Marketplace</p>
        <p className="item-contact">ann.b@gmail.com</p>
      </div>
    </div>
  );
}
