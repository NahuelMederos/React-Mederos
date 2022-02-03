import React from "react";
import { InputGroup, Button } from "react-bootstrap";

function ItemCount({
  stock,
  initial,
  nombre,
  decrement,
  increment,
  contador,
  onAdd,
}) {
  if (initial > stock) {
    initial = stock;
  }

  return (
    <div className="text-center">
      <InputGroup className="justify-content-center">
        <Button disabled={stock === 0} onClick={() => decrement()}>
          -
        </Button>
        <InputGroup.Text className="numero-contador justify-content-center">
          {contador}
        </InputGroup.Text>
        <Button disabled={stock === 0} onClick={() => increment()}>
          +
        </Button>
      </InputGroup>

      <Button
        disabled={stock === 0}
        onClick={() => onAdd()}
        variant={
          stock === 0 ? "danger mt-1 mb-10" : "outline-success mt-1 mb-3"
        }
      >
        Agregar al carrito
      </Button>
    </div>
  );
}

export default ItemCount;
