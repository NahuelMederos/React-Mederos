import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetail from "./components/ItemDetail";
import Cart from "./components/Cart";
import { CartProvider } from "./context/cartContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CompraFinalizada from "./components/CompraFinalizada";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { AuthProvider } from "./context/authContext";
import Wishlist from "./pages/Wishlist";
import PrivateRoute from "./pages/PrivateRoute";

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
            <Route
              path="signup"
              element={
                <PrivateRoute loggedOnly={false}>
                  <SignUp />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="signin"
              element={
                <PrivateRoute loggedOnly={false}>
                  <SignIn />
                </PrivateRoute>
              }
            ></Route>
            <Route path="item">
              <Route index element={<ItemDetail />} />
              <Route path=":id" element={<ItemDetail />} />
            </Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route
              path="comprarealizada/:orderId"
              element={<CompraFinalizada />}
            ></Route>
            <Route
              path="wishlist"
              element={
                <PrivateRoute loggedOnly={true}>
                  <Wishlist />
                </PrivateRoute>
              }
            ></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
