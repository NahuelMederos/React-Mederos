import React from 'react'
import ItemCount from './ItemCount'

function ItemListContainer(props) {
    return (
        <>
        <div className='producto'>
            <p>Producto: {props.nombre}</p>
            <p>Precio: {props.precio}</p>
            <p>Descripcion: {props.descripcion}</p>
        </div>
        <ItemCount
        stock={props.stock}
        initial={props.initial}
        nombre={props.nombre}/>
        </>
    )
}

export default ItemListContainer
