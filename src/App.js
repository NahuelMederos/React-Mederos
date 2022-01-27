import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetail from "./components/ItemDetail";

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer />
      <ItemDetail
        id={0}
        title="Camiseta"
        price={1500}
        details="Camiseta roja fachera"
        pictureUrl="images/camiseta.jpg"
        stock={10}
      />
    </>
  );
}

export default App;
