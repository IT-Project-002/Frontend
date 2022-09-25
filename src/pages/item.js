import "../css/item.css";
import Slider from "../components/imageSlider";
import React from "react";

export default function Item() {
  return (
    <div className="layout-item">
      <div className="item-img" >
        <Slider/>
      </div>
      {/* <img className="item-img" src={sample} alt="sample"></img> */}
      <div className="item-desc-container">
        <h1 className="item-name">Purely Hand-made mug, Perfectly for hot tea in winter.</h1>
        <h1 className="item-price">AU$49.00+</h1>
        <p className="item-desc">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
            dolore magna aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
            invidunt ut labore et ut labore et dolore magna aliquyam erat.
        </p>
        <p className="item-status">Available</p>
        <p className="item-contact">ann.b@gmail.com</p>
      </div>
    </div>
  );
}