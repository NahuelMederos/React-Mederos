import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemCount from "./components/ItemCount";

function App() {
  return (
    <>
      <NavBar/>
      <ItemListContainer
      nombre="Camiseta"
      precio="1500"
      descripcion="Camiseta marca camisinha para niños"
      stock={10}
      initial={3}/>
      <ItemListContainer
      nombre="Almohada"
      precio="200"
      descripcion="Almohada muy comoda"
      stock={5}
      initial={1}/>
      <ItemListContainer
      nombre="Termo"
      precio="2500"
      descripcion="Termo de metal verde"
      stock={0}
      initial={1}/>
      
      
      
    </>
  );
}

export default App;
