import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

function Item(props) {
  let navigate = useNavigate();

  return (
    <Card
      as="button"
      className="mb-2 mt-3 item-card"
      bg="light"
      border="light"
      onClick={() => navigate(`/item/${props.id}`)}
    >
      <Card.Img
        variant="top"
        className="item-img"
        src={"/" + props.pictureUrl}
        alt={props.title}
      />
      <Card.Body>
        <Card.Title className="mb-3 ">{props.title}</Card.Title>
        {props.price && (
          <Card.Text className="lead fs-2">${props.price}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default Item;
