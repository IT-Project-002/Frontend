import item1 from "../image/items/item1.png";
import item2 from "../image/items/item2.png";
import item3 from "../image/items/item3.png";
import item4 from "../image/items/item4.png";
import item5 from "../image/items/item5.png";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from "react";

export default function ItemList() {
  return (
    <div className="wrapper">
      <Card
        img={item1}
        title="Tie Up Boots"
        description="Fall Favorite • Boots"
        price="45.00"
      />

      <Card
        img={item2}
        title="Plush Sweater"
        description="Sweater Season • Cozy"
        price="29.95"
      />
      <Card
        img={item3}
        title="Slim-Fit Demin"
        description="Demin • Verstile"
        price="24.99"
      />
      <Card
        img={item4}
        title="White Blouse"
        description="Blouse • Lacey"
        price="19.95"
      />
      <Card
        img={item5}
        title="White Blouse"
        description="Blouse • Lacey"
        price="19.95"
      />
      <Card
        img={item1}
        title="White Blouse"
        description="Blouse • Lacey"
        price="19.95"
      />
    </div>
  );
}

function Card(props) {
  return (
    <div className="card">
      <img src={props.img} alt="item" className="card-img" />
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <h3 className="card-price">{props.price}</h3>
        <div className="icon-container">
          <EditIcon className="edit-icon"/>
          <DeleteForeverIcon className="delete-icon"/>
        </div>
      </div>
    </div>
  );
}
