import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Item(props) {
  let navigate = useNavigate();

  return (
    <div className="item">
      <p>{props.title}</p>
      <img
        className="item-img"
        src={"/" + props.pictureUrl}
        alt={props.title}
      />
      <br />
      <Button variant="dark" onClick={() => navigate(`/item/${props.id}`)}>
        Detalles
      </Button>
    </div>
  );
}

export default Item;
