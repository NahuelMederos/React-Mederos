import React from 'react'
import { Nav} from 'react-bootstrap'

function CartWidget() {
    return (
        <div>
            <Nav.Link href="#"><img src="images/Carrito.png" alt="carrito png" className="carrito"/>  Carrito</Nav.Link>
        </div>
    )
}

export default CartWidget
