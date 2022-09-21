import "../css/landing.css";
import "../css/modal.css";
import Modal from "../components/modal"
import item1 from "../image/items/item1.png";
import item2 from "../image/items/item2.png";
import item3 from "../image/items/item3.png";
import item4 from "../image/items/item4.png";
import item5 from "../image/items/item5.png";
import Gallery from "../components/carousel";

import React,{useEffect, useState} from "react"
function Landing() {
  const [showModal, setShowModal] = useState(false);
  /* appear after 5 seconds */
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setShowModal(true)
    },[5000]);
    return () => clearTimeout(timer);
  },[]);

  const Toggle = () => {
    setShowModal(false);
  }

  return (
    <div className="layout-landing">
      <div className="slider-container">
        <Gallery autoPlay={false}/>
      </div>
      <div className="browse-gird-container">
        <div className="browse-container">
          <div>
            <a href="/user/item"><img src={item1} alt="item1" ></img></a>
          </div>
          <div>
            <a href="/user/item"><img src={item2} alt="item1" ></img></a>
          </div>
          <div>
            <a href="/user/item"><img src={item3} alt="item1" ></img></a>
          </div>
          <div>
            <a href="/user/item"><img src={item4} alt="item1" ></img></a>
          </div>
          <div>
            <a href="/user/item"><img src={item5} alt="item1" ></img></a>
          </div>
          <div>
            <a href="/user/item"><img src={item1} alt="item1" ></img></a>
          </div>
          <div>
            <a href="/user/item"><img src={item2} alt="item1" ></img></a>
          </div>
          <div>
            <a href="/user/item"><img src={item4} alt="item1" ></img></a>
          </div>
          <div>
            <a href="/user/item"><img src={item5} alt="item1" ></img></a>
          </div>
          <div>
            <a href="/user/item"><img src={item1} alt="item1" ></img></a>
          </div>
          <div>
            <a href="/user/item"><img src={item2} alt="item1" ></img></a>
          </div>
          <div></div>
        </div>
      </div>
      {showModal && <Modal className="pop-up" close = {Toggle}/>}
    </div>
  );
}

export default Landing;