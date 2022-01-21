import React, { useEffect, useState } from "react";
import Item from "./Item";

const ITEMS = [
  {
    id: 0,
    title: "Camiseta",
    price: 1500,
    pictureUrl: "images/camiseta.jpg",
  },
  {
    id: 1,
    title: "Almohada",
    price: 200,
    pictureUrl: "images/almohada.jpg",
  },
  {
    id: 2,
    title: "Termo",
    price: 1500,
    pictureUrl: "images/termo.jpg",
  },
];

function ItemList() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getItems = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(ITEMS), 2000);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getItems()
      .then((data) => setItems(data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="d-flex justify-content-center ">
      {isLoading ? (
        <div
          className="spinner-grow position-absolute top-50 start-50 "
          role="status"
        ></div>
      ) : (
        items.map((item) => (
          <Item
            key={item.id}
            title={item.title}
            price={item.price}
            pictureUrl={item.pictureUrl}
          />
        ))
      )}
    </div>
  );
}

export default ItemList;
