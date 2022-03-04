import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import Item from "../components/Item";

function Wishlist() {
  const { userData } = useAuth();
  let navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(userData?.wishlist);
  }, [userData?.wishlist]);

  if (!wishlist) {
    return (
      <div
        className="spinner-grow position-absolute top-50 start-50 "
        role="status"
      ></div>
    );
  } else if (wishlist.length === 0) {
    return (
      <>
        <div className="jumbotron ms-2">
          <h1 className="display-4">Tu lista de deseos esta vacia</h1>
          <hr className="my-4"></hr>
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary btn-lg"
          >
            Volver al inicio
          </button>
        </div>
      </>
    );
  } else
    return (
      <Container className="item-list-container">
        <Row
          xs={1}
          sm={2}
          lg={3}
          xl={4}
          xxl={5}
          className="justify-content-center"
        >
          {userData.wishlist.map((item) => (
            <Col key={item.id}>
              <Item
                id={item.id}
                title={item.title}
                pictureUrl={item.pictureUrl}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
}

export default Wishlist;
