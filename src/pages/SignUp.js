import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nombreRef = useRef();
  const apellidoRef = useRef();
  const [phone, setPhone] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasword, setShowPassword] = useState(true);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Las contraseñas no coinciden");
    } else if (/^\d+$/.test(phone) === false) {
      return setError("El telefono debe estar compuesto solo por numeros");
    }

    try {
      setError("");
      setIsLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nombreRef.current.value,
        apellidoRef.current.value,
        phone
      );
      navigate("/");
    } catch (error) {
      setError("" + error.message);
      setIsLoading(false);
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
              <h2 className="text-center mb-4">Registro</h2>
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
                    ref={emailRef}
                    required
                    autoComplete="on"
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type={showPasword ? "password" : "text"}
                    ref={passwordRef}
                    required
                    autoComplete="off"
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type={showPasword ? "password" : "text"}
                    ref={passwordConfirmRef}
                    required
                    autoComplete="off"
                  ></Form.Control>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  id="passswordCheck"
                  controlId="formBasicCheckbox"
                >
                  <Form.Check
                    onClick={() => setShowPassword(!showPasword)}
                    type="checkbox"
                    label="Mostrar contraseña"
                  />
                </Form.Group>
                <Form.Group id="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    ref={nombreRef}
                    required
                    autoComplete="off"
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="apellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    ref={apellidoRef}
                    required
                    autoComplete="off"
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="phone">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    minLength={7}
                    maxLength={15}
                    required
                  ></Form.Control>
                </Form.Group>
                <Button
                  disabled={isLoading}
                  className="w-100 mt-3 mb-3"
                  type="submit"
                >
                  Registrarse
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-10 text-center mt-2">
            Ya tienes una cuenta? <Link to="/signin">Iniciar sesion</Link>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SignUp;
