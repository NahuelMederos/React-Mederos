import React from "react";
import ItemCount from "./ItemCount";
import { Row, Col } from "react-bootstrap";

function ItemDetail(props) {
  return (
    <div className="mt-5">
      <Row>
        <Col>
          <img
            className="item-img-detail"
            src={props.pictureUrl}
            alt={props.title}
          />
        </Col>
        <Col>
          <h1>{props.title}</h1>
          <p>Precio : {props.price}</p>
          <p>Detalles: {props.details}</p>
        </Col>
        <ItemCount nombre={props.title} stock={props.stock} initial={1} />
      </Row>
    </div>
  );
}

export default ItemDetail;
