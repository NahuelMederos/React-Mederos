import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetail from "./components/ItemDetail";
import Cart from "./components/Cart";
import { CartProvider } from "./context/cartContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompraFinalizada from "./components/CompraFinalizada";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index path="/" element={<ItemListContainer />}></Route>
          <Route path="category">
            <Route index element={<ItemListContainer />}></Route>
            <Route path=":id" element={<ItemListContainer />} />
          </Route>
          <Route path="item">
            <Route index element={<ItemDetail />} />
            <Route path=":id" element={<ItemDetail />} />
          </Route>
          <Route index path="cart" element={<Cart />}></Route>
          <Route
            index
            path="comprarealizada/:orderId"
            element={<CompraFinalizada />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
