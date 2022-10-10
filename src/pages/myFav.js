import "../css/myFav.css";
import backgroundTop from "../image/background/myfav1.png";
import backgroundBottom from "../image/background/myfav2.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MyFav() {
  const userID = sessionStorage.getItem("id");
  const access_token = sessionStorage.getItem("access_token");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/users/myfav/" + userID, {
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
        setItems(dat);
        setLoading(false);
      });
  }, [access_token, userID]);
  return (
    <div className="layout-like">
      <div className="myfav-title">
        <h1>My Favourite</h1>
      </div>
      <div className="myfav-items-container">
        <div className="wrapper">
          {items.map((item, index) => (
              <div key={item.uuid}>
                <Card
                  prod_id={item.uuid}
                  img={item.image}
                  title={item.name}
                  description={item.tags}
                  price={item.price}
                  active={true}
                />
              </div>
            ))}
        </div>
      </div>
      <img className="itemhead" src={backgroundTop} alt="item1"></img>
      <img className="itemfoot" src={backgroundBottom} alt="item2"></img>
    </div>
  );
}

function Card(props) {
  const [isActive, setIsActive] = useState(props.active);
  const access_token = sessionStorage.getItem("access_token");

  const toggleButton = () => {
    fetch("/users/like", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + access_token,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({"item": props.prod_id})
    })
    setIsActive((current) => !current);
  };

  return (
    <div className="card">
      <a href={`/user/item/${props.prod_id}`}>
        <img src={props.img} alt="item" className="card-img" />
      </a>
      <div className="card-body">
        <div className="card-title-like">
          <h2 className="card-title">{props.title}</h2>
          <FavoriteBorderIcon
            onClick={toggleButton}
            style={{
              backgroundColor: isActive ? "#f48b8b" : "#bcb4a7",
            }}
          />
        </div>
        <h3 className="card-price">{props.price}</h3>
      </div>
    </div>
  );
}
