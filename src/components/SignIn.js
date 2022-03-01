import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setError("");
      await signin(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("" + error.message);
    } finally {
      setIsLoading(false);
      navigate("/");
    }
  };

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "450px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Bienvenido</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form
                onSubmit={handleSubmit}
                className="m-auto"
                style={{ maxWidth: "350px" }}
              >
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="email"
                    id="email"
                    ref={emailRef}
                    required
                    autoComplete="on"
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="password"
                    ref={passwordRef}
                    required
                    autoComplete="off"
                  ></Form.Control>
                </Form.Group>
                <Button
                  disabled={isLoading}
                  className="w-100 mt-3 mb-3"
                  type="submit"
                >
                  Iniciar Sesion
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-10 text-center mt-2">
            No tienes una cuenta? <Link to="/signup">Registrarse</Link>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SignIn;
