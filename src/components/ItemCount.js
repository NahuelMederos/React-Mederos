import React from "react";
import { InputGroup, Button } from "react-bootstrap";

function ItemCount({ stock, decrement, increment, contador, onAdd }) {
  return (
    <div className="text-center mt-5">
      <Button
        className="btn-lg mt-1 mb-1"
        disabled={stock === 0}
        onClick={() => onAdd()}
        variant={stock === 0 ? "danger " : "success"}
      >
        Agregar al carrito
      </Button>
      <InputGroup className="justify-content-center ">
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
    </div>
  );
}

export default ItemCount;
