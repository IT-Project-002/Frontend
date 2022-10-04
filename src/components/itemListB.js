import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress";

export default function ItemList(props) {
//   console.log(props);
  // console.log(props.data.item_names);
  const items = props.data.item_names;
  const links = props.data.item_links;
  const prices = props.data.item_price;
  const tags = props.data.item_tags;
  const prodId = props.data.item_id;
  const access_token = sessionStorage.getItem("access_token");
  return (
    <>
      {!items ? (
        <CircularProgress className="wrapperB" />
      ) : (
        <div className="wrapperB">
          {items.map((item, index) => (
            <div key={items[index]}>
              <Card prod_id={prodId[index]} img={links[index]} title={item} description={tags[index]} price={prices[index]}/>
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
    console.log(access_token)
    console.log(props)
    console.log({"aaa": item});
    fetch("/users/delete", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + access_token,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(props),
    })
    .then((res) => {
      if (res.status === 200){
        window.location.reload()
      }
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
