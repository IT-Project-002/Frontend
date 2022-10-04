import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress";

export default function ItemList(props) {
  // console.log(props);
  // console.log(props.data.item_names);
  const items = props.data.item_names;
  const links = props.data.item_links;
  const prices = props.data.item_price;
  const tags = props.data.item_tags;
  const access_token = sessionStorage.getItem("access_token");
  return (
    <>
      {!items ? (
        <CircularProgress className="wrapperB" />
      ) : (
        <div className="wrapperB">
          {items.map((item, index) => (
            <div key={items[index]}>
              <Card img={links[index]} title={item} description={tags[index]} price={prices[index]} token={access_token}/>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function Card(props) {
  const access_token = sessionStorage.getItem("access_token");
  const deleteItem = (item) => {
    console.log({"aaa": item});
    fetch("/users/delete", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + access_token,
      },
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(props),
    })
    .then((res) => {
      console.log({res});
    })
  }

  return (
    <div className="card">
      {/* navigate to item page */}
      {/* <a href={`/user/item/${item._id}`}> */}
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
          <a><DeleteForeverIcon className="delete-icon" onClick={() => deleteItem(props)}/></a>
          {/* <DeleteForeverIcon className="delete-icon" onClick={deleteItem(props)}/> */}
        </div>
      </div>
    </div>
  );
}
