import React, { useEffect, useState } from "react";
import Item from "./Item";

function ItemList() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const URL = "http://localhost:3001/productos";

    setIsLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setItems(json))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="d-flex justify-content-center ">
      {isLoading ? (
        <div
          className="spinner-grow position-absolute top-50 start-50 "
          role="status"
        ></div>
      ) : error ? (
        "Hubo un error " + error
      ) : (
        items.map((item) => (
          <Item
            key={item.id}
            title={item.title}
            price={item.price}
            pictureUrl={item.pictureUrl}
            stock={item.stock}
          />
        ))
      )}
    </div>
  );
}

export default ItemList;
