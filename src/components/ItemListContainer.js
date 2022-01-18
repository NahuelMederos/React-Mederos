import React from 'react'

function ItemListContainer(props) {
    return (
        <div className='producto'>
            <p>Producto: {props.nombre}</p>
            <p>Precio: {props.precio}</p>
            <p>Descripcion: {props.descripcion}</p>
        </div>
    )
}

export default ItemListContainer
