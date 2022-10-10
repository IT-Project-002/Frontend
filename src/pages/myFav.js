import "../css/myFav.css";
import backgroundTop from "../image/background/myfav1.png";
import backgroundBottom from "../image/background/myfav2.png";
import item1 from "../image/items/item1.png";
import item2 from "../image/items/item2.png";
import item3 from "../image/items/item3.png";
import item4 from "../image/items/item4.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useState, useEffect } from "react";

export default function MyFav() {
  return (
    <div className="layout-like">
      <div className="myfav-title">
        <h1>My Favourite</h1>
      </div>
      <div className="myfav-items-container">
        <div className="wrapper">
          <Card img={item1} price={20.2} title="Tie Up Boots" />
          <Card img={item2} price={20.2} title="Tie Up Boots" />
          <Card img={item3} price={20.2} title="Tie Up Boots Boots AA" />
          <Card img={item4} price={20.2} title="Tie Up Boots" />
          <Card img={item1} price={20.2} title="Tie Up Boots" />
          {/* <Card img={item1} price={20.2} title="Tie Up Boots" />
          <Card img={item2} price={20.2} title="Tie Up Boots" />
          <Card img={item3} price={20.2} title="Tie Up Boots Boots AA" />
          <Card img={item4} price={20.2} title="Tie Up Boots" />
          <Card img={item1} price={20.2} title="Tie Up Boots" /> */}
        </div>
      </div>
      <img className="itemhead" src={backgroundTop} alt="item1"></img>
      <img className="itemfoot" src={backgroundBottom} alt="item2"></img>
    </div>
  );
}

function Card(props, active) {
  const [isActive, setIsActive] = useState(active);

  const toggleButton = () => {
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
              backgroundColor: isActive ? "#bcb4a7" : "",
            }}
          />
        </div>
        <h3 className="card-price">{props.price}</h3>
      </div>
    </div>
  );
}
