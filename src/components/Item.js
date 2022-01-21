import React from "react";

function Item(props) {
  return (
    <div className="item">
      <p>Id: {props.id}</p>
      <p>Producto: {props.title}</p>
      <p>Precio: {props.price}</p>
      <img className="item-img" src={props.pictureUrl} alt={props.title} />
    </div>
  );
}

export default Item;
