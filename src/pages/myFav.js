import "../css/myFav.css";
import backgroundTop from "../image/background/myfav1.png"
import backgroundBottom from "../image/background/myfav2.png"
import item1 from "../image/items/item1.png"
import item2 from "../image/items/item2.png"
import item3 from "../image/items/item3.png"
import item4 from "../image/items/item4.png"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from "react";

export default function MyFav() {
  return (
    <div className="layout-like">
      <div className = "content">
        <h1>My Favourite</h1>
        <div className = "items">
        <div className="singleImg">
          <FavoriteBorderIcon className="heart"/>
          <div className="ImgBox"><img className = "ItemImg" src={item1} alt="item3" ></img></div>
          <h2>Embroidery Artist Katerina Marchenko</h2>
        </div>
        <div className="singleImg">
          <FavoriteBorderIcon className="heart"/>
          <div className="ImgBox"><img className = "ItemImg" src={item2} alt="item4" ></img></div>
          <h2>Bébé mobile Crèche mobile Crèche neutre Lit bébé mobile Cloud</h2>
        </div>
        <div className="singleImg">
          <FavoriteBorderIcon className="heart"/>
          <div className="ImgBox"><img className = "ItemImg" src={item3} alt="item5" ></img></div>
          <h2>Spring in Coming in my mug</h2>
        </div>
        <div className="singleImg">
          <FavoriteBorderIcon className="heart"/>
          <div className="ImgBox"><img className = "ItemImg" src={item4} alt="item6" ></img></div>
          <h2>Painting: Clouds</h2>
        </div>
        <div className="singleImg">
          <FavoriteBorderIcon className="heart"/>
          <div className="ImgBox"><img className = "ItemImg" src={item1} alt="item6" ></img></div>
          <h2>Painting: Clouds</h2>
        </div>
        <div className="singleImg">
          <FavoriteBorderIcon className="heart"/>
          <div className="ImgBox"><img className = "ItemImg" src={item2} alt="item6" ></img></div>
          <h2>Painting: Clouds</h2>
        </div>
        <div className="singleImg">
          <FavoriteBorderIcon className="heart"/>
          <div className="ImgBox"><img className = "ItemImg" src={item3} alt="item6" ></img></div>
          <h2>Painting: Clouds</h2>
        </div>
      </div>

      </div>
      <img className="itemhead" src={backgroundTop} alt="item1" ></img>
      <img className="itemfoot" src={backgroundBottom} alt="item2" ></img>

    </div>
  );
}