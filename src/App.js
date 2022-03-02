import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetail from "./components/ItemDetail";
import Cart from "./components/Cart";
import { CartProvider } from "./context/cartContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompraFinalizada from "./components/CompraFinalizada";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./context/authContext";
import Whishlist from "./components/Whishlist";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />}></Route>
            <Route path="category">
              <Route index element={<ItemListContainer />}></Route>
              <Route path=":id" element={<ItemListContainer />} />
            </Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="signin" element={<SignIn />}></Route>
            <Route path="item">
              <Route index element={<ItemDetail />} />
              <Route path=":id" element={<ItemDetail />} />
            </Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route
              path="comprarealizada/:orderId"
              element={<CompraFinalizada />}
            ></Route>
            <Route path="wishlist" element={<Whishlist />}></Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
