import React from "react";

function Item(props) {
  return (
    <div className="item">
      <p>Producto: {props.title}</p>
      <img className="item-img" src={props.pictureUrl} alt={props.title} />
    </div>
  );
}

export default Item;
