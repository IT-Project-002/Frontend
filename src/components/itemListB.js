import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function ItemList(props) {
  console.log(props);
  console.log(props.data.item_names);
  const items = props.data.item_names;
  const links = props.data.item_links;
  return (
    <div className="wrapper">
      {/* avoid a blank array[] */}
      {items?.map((item, index) => (
        <div key={items[index]}>
          <Card img={links[index]} title={item} description="/" price="/" />
        </div>
      ))}
    </div>
  );
}

function Card(props) {
  return (
    <div className="card">
      {/* navigate to item page */}
      <a href="/user/item">
        <img src={props.img} alt="item" className="card-img" />
      </a>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <h3 className="card-price">{props.price}</h3>
        <div className="icon-container">
          <a href="/user/upload">
            <EditIcon className="edit-icon" />
          </a>
          <DeleteForeverIcon className="delete-icon" />
        </div>
      </div>
    </div>
  );
}
