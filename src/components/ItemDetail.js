import React, { useEffect, useState, useContext } from "react";
import ItemCount from "./ItemCount";
import { Row, Col, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { getFirestore } from "../firebase";
import { useAuth } from "../context/authContext";
import firebase from "firebase/app";

function ItemDetail() {
  const { id } = useParams();
  let navigate = useNavigate();

  const { userData, currentUser } = useAuth();
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contador, setContador] = useState(1);
  const { addItem, cantidadEnCarro } = useContext(CartContext);
  const [onWishList, setOnWishList] = useState(true);
  const [wishListLoading, setwishListLoading] = useState(false);

  useEffect(() => {
    const db = getFirestore();
    const productsCollection = db.collection("productos");
    const selectedItem = productsCollection.doc(id);

    const getDataFromFirestore = async () => {
      setIsLoading(true);
      try {
        const response = await selectedItem.get();
        if (response.exists) {
          setItem({ ...response.data(), id: response.id });
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userData.wishlist) {
      setOnWishList(userData.wishlist.some((x) => id === x.id));
    }

    getDataFromFirestore();
  }, [id, userData]);

  const decrement = () => {
    contador <= 1
      ? setContador((prevState) => prevState)
      : setContador((prevState) => prevState - 1);
  };

  const increment = () => {
    contador >= item.stock - cantidadEnCarro(item.id)
      ? setContador((prevState) => prevState)
      : setContador((prevState) => prevState + 1);
  };

  const onAdd = () => {
    addItem(item.id, item.title, contador, item.price, item.pictureUrl);
    navigate("/cart");
  };

  const addToWishlist = async () => {
    setwishListLoading(true);
    try {
      const db = getFirestore();
      await db
        .collection("users")
        .doc(currentUser.uid)
        .update({
          wishlist: firebase.firestore.FieldValue.arrayUnion({
            id: item.id,
            title: item.title,
            pictureUrl: item.pictureUrl,
          }),
        });
      userData.wishlist.push({
        id: item.id,
        title: item.title,
        pictureUrl: item.pictureUrl,
      });
      setOnWishList(true);
    } catch (error) {
      console.log(error);
      setOnWishList(false);
    } finally {
      setwishListLoading(false);
    }
  };

  const removeFromWishList = async () => {
    setwishListLoading(true);
    try {
      const db = getFirestore();
      await db
        .collection("users")
        .doc(currentUser.uid)
        .update({
          wishlist: firebase.firestore.FieldValue.arrayRemove({
            id: item.id,
            title: item.title,
            pictureUrl: item.pictureUrl,
          }),
        });
      userData.wishlist = userData.wishlist.filter((x) => x.id !== item.id);
      setOnWishList(false);
    } catch (error) {
      console.log(error);
      setOnWishList(true);
    } finally {
      setwishListLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div
          className="spinner-grow position-absolute top-50 start-50 "
          role="status"
        ></div>
      ) : error ? (
        "Hubo un error " + error
      ) : item.length === 0 ? (
        <div className="d-flex flex-column align-items-center mt-5">
          <h1>Lo sentimos.</h1>
          <p className="lead">No pudimos encontrar este articulo.</p>
          <p className="lead">
            <button
              onClick={() => navigate("/")}
              className="btn btn-lg btn-secondary fw-bold border-white bg-black"
            >
              Volver al inicio
            </button>
          </p>
        </div>
      ) : (
        <Container className="mt-5 item-detail-container pt-5 pb-5">
          <Row>
            <Col lg={6} xl={5}>
              <img
                className="item-img-detail mb-3 ms-5"
                src={"/" + item.pictureUrl}
                alt={item.title}
              />
            </Col>
            <Col lg={6} xl={7}>
              <h1>{item.title}</h1>
              <h2 className="lead fs-3">Precio : {item.price}</h2>
              <p className="lead fs-5 text-break">Detalles: {item.details}</p>
              {currentUser &&
                (onWishList ? (
                  <Button
                    disabled={wishListLoading}
                    className="btn btn-danger mb-3"
                    onClick={removeFromWishList}
                  >
                    Eliminar de la lista de deseados
                  </Button>
                ) : (
                  <Button
                    disabled={wishListLoading}
                    className="btn btn-primary mb-3"
                    onClick={addToWishlist}
                  >
                    Agregar a la lista de deseados
                  </Button>
                ))}
            </Col>
            {
              <ItemCount
                stock={item.stock - cantidadEnCarro(item.id)}
                decrement={decrement}
                increment={increment}
                onAdd={onAdd}
                contador={contador}
              />
            }
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ItemDetail;
