import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";

function App() {
  return (
    <>
      <NavBar/>
      <ItemListContainer
      nombre="Zapatos"
      precio="1500"
      descripcion="Zapatos marca zapatinhos para niños"/>
      <ItemListContainer
      nombre="Almohada"
      precio="200"
      descripcion="Almohada muy comoda"/>
      <ItemListContainer
      nombre="Termo"
      precio="2500"
      descripcion="Termo de metal verde"/>
    </>
  );
}

export default App;
