import "../css/myFav.css";
import backgroundTop from "../image/background/myfav1.png";
import backgroundBottom from "../image/background/myfav2.png";
import item1 from "../image/items/item1.png";
import item2 from "../image/items/item2.png";
import item3 from "../image/items/item3.png";
import item4 from "../image/items/item4.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";

export default function MyFav() {
  return (
    <div className="layout-like">
      <div className="myfav-title">
        <h1>My Favourite</h1>
      </div>
      <div className="myfav-items-container">
        <div className="wrapper">
          <Card img={item1} price={20.20} title="Tie Up Boots" />
          <Card img={item2} price={20.20} title="Tie Up Boots" />
          <Card img={item3} price={20.20} title="Tie Up Boots Boots AA" />
          <Card img={item4} price={20.20} title="Tie Up Boots" />
          <Card img={item1} price={20.20} title="Tie Up Boots" />
        </div>
      </div>
      <img className="itemhead" src={backgroundTop} alt="item1"></img>
      <img className="itemfoot" src={backgroundBottom} alt="item2"></img>
    </div>
  );
}

function Card(props) {
  return (
    <div className="card">
      <div>
        <FavoriteBorderIcon />
      </div>
      <img src={props.img} alt="item" className="card-img" />
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <h3 className="card-price">{props.price}</h3>
      </div>
    </div>
  );
}
