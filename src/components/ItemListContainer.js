import React from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

function ItemListContainer(props) {
  const { id } = useParams();

  return (
    <>
      <ItemList categoria={id} />
    </>
  );
}

export default ItemListContainer;
