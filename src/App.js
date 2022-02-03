import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetail from "./components/ItemDetail";
import Cart from "./components/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
