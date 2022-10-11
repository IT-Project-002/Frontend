import "../css/item.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "../components/imageSlider";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Item() {
  const access_token = sessionStorage.getItem("access_token");
  const { itemId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const toggleButton = () => {
    fetch("/users/like", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + access_token,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({"item": itemId})
    })
    setIsActive((current) => !current);
  };

  useEffect(() => {
    fetch("/users/item/" + itemId, {
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
        if (res.status !== 200) {
          sessionStorage.removeItem("access_token");
          window.location.href = window.location.origin + "/user/login";
        } else {
          return res.json();
        }
      })
      .then((dat) => {
        console.log(dat);
        setData(dat);
        setIsActive(dat.liked);
        setLoading(false);
      });
  }, [access_token, itemId]);

  return (
    <>
      {loading ? (
        <CircularProgress className="loading" />
      ) : (
        <div className="layout-item">
          <div className="item-img">
            <Slider image={data["prod_images"]} />
          </div>
          <div className="item-desc-container">
            <div className="item-tags">
              {data["prod_tags"]?.map((tag) => (
                <div className="tag" key={tag}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </div>
              ))}
            </div>
            <div className="item-name-like">
              <h1 className="item-name">{data["prod_name"]}</h1>
              <FavoriteBorderIcon
                onClick={toggleButton}
                style={{
                  backgroundColor: isActive ? "#f48b8b" : "",
                }}
              />
            </div>
            <h1 className="item-price">AU${data["prod_price"]}</h1>
            <p className="item-desc">{data["prod_desc"]}</p>
            <a
              href={`/user/market/${data["user_id"]}`}
              style={{ textDecoration: "none" }}
            >
              <p className="item-owner">{data["user_name"]}'s Marketplace</p>
            </a>
            {!data["user_hide_email"] ? (
              <p className="item-contact">{data["user_email"]}</p>
            ) : (
              <p className="item-contact">No public contact information</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}