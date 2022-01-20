import React, { useState } from 'react';
import {InputGroup, Button } from 'react-bootstrap'

function ItemCount({stock,initial,nombre}) {
  if(initial > stock){
    initial = stock;
  }
    const[contador,setContador] = useState(initial);
    
    const onAdd = () => {
      alert(`Se agregaron ${contador} ${nombre}s al carrito`)
    }

  return <div className="text-center">

    <InputGroup className="justify-content-center">
      <Button disabled={stock===0} onClick={() => contador<=1 ? setContador(contador): setContador(contador - 1)} >-</Button>
      <InputGroup.Text className='numero-contador justify-content-center'>{contador}</InputGroup.Text>
      <Button disabled={stock===0} onClick={() => contador>=stock ? setContador(contador): setContador(contador + 1)}>+</Button>
    </InputGroup>

    <Button disabled={stock===0} onClick={onAdd} variant={stock===0 ? "danger mt-1 mb-10" : "outline-success mt-1 mb-3"}>Agregar al carrito</Button>

    
    

  </div>;
}

export default ItemCount;
