import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function ItemList(props) {
  const items = props.data.map((item) => item.image);
  // console.log(props);
  // console.log(links);
  return (
    <>
      {!items ? (
        <CircularProgress
          className="wrapper"
          style={{ margin: "auto", marginTop: "-10px" }}
        />
      ) : (
        <div className="wrapper">
          {props.data.map((item) => (
            <div key={item.uuid}>
              <Card
                prod_id={item.uuid}
                img={item.img}
                title={item.name}
                description={item.tags}
                price={item.price}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function Card(props) {
  return (
    <div className="card">
      {/* navigate to item page */}
      <a href={`/user/item/${props.prod_id}`}>
        <img src={props.img} alt="item" className="card-img" />
      </a>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <h3 className="card-price">{props.price}</h3>
      </div>
    </div>
  );
}
