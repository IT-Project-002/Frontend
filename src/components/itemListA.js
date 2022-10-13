import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function ItemList(props) {
  const items = props.data.name;
  const links = props.data.img;
  const prices = props.data.price;
  const tags = props.data.tags;
  const prodId = props.data.uuid;
  // console.log(props);
  console.log(links);
  return (
    <>
      {!items ? (
        <CircularProgress className="wrapper" />
      ) : (
        <div className="wrapper">
          {items.map((item, index) => (
            <div key={prodId[index]}>
              <Card
                prod_id={prodId[index]}
                img={links[index][0]}
                title={item}
                description={tags[index]}
                price={prices[index]}
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
