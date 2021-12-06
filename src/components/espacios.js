import React, { useState, useEffect } from "react";
import casa from "../assets/house.png";
import apartamento from "../assets/apartment.png";
import Cuarto from "./cuarto";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

function Espacios() {
  const URL =
    "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";

  const [espacios, setEspacios] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("espacios") === null) {
        setEspacios(["Loading..."]);
      } else {
        setEspacios(JSON.parse(localStorage.getItem("espacios")));
      }
    } else {
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          if(JSON.parse(localStorage.getItem("espacios")) !== null){
            if (JSON.parse(localStorage.getItem("espacios")).length === 0){
              localStorage.setItem("espacios", JSON.stringify([]));
            }
          }
          else{
            localStorage.setItem("espacios", JSON.stringify([]));
          }
          setEspacios(res);
        });
    }
  }, []);

  function getPhoto(espacio) {
    let nombre = String(espacio.name);
    if (nombre.includes("Casa")) {
      return casa;
    } else if (nombre.includes("Apartamento")) {
      return apartamento;
    }
  }

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [cuarto, setCuarto] = useState({});

  function displayCuartos(espacio) {
    let esta = 0;
    let espaciosVisitados = JSON.parse(localStorage.getItem("espacios"));

    if (espaciosVisitados !== null){
      espaciosVisitados.forEach((esp) => {
        if (esp.id === espacio.id) {
          esta = 1;
        }
      });
      if (esta === 0) {
        espaciosVisitados.push(espacio);
      }
    }
    else{
      espaciosVisitados = [];
      espaciosVisitados.push(cuarto);
    }
    localStorage.setItem("espacios", JSON.stringify(espaciosVisitados));
    setCuarto(espacio);
    handleShow();
  }

  function ShowCuartos() {
    if (show) {
      return <Cuartos />;
    }
    return <NoCuartos />;
  }

  function Cuartos() {
    return (
      <Container>
        <Row>
          <h2>
            <FormattedMessage id="MySpaces" />
          </h2>
        </Row>
        <br/>
        <Row xs={2} md={3} lg={4}>
          {espacios.map((espacio, i) => (
            <Col>
              <Card
                style={{ width: "12rem", margin: "1rem" }}
                key={i}
                onClick={() => displayCuartos(espacio)}
              >
                <Card.Img src={getPhoto(espacio)} variant="top" alt="espacio" />
                <Card.Body>
                  <Card.Title>{espacio.name}</Card.Title>
                  <Card.Text>{espacio.address}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <br/>
        <Row>
          <h3>
            <FormattedMessage id="MyRooms" />
          </h3>
        </Row>
        <br/>
        <Cuarto c={cuarto} />
      </Container>
    );
  }

  function NoCuartos() {
    return (
      <Container>
        <Row>
          <h2>
            <FormattedMessage id="MySpaces" />
          </h2>
        </Row>
        <br/>
        <Row xs={2} md={3} lg={4}>
          {espacios.map((espacio, i) => (
            <Col>
              <Card
                style={{ width: "12rem", margin: "1rem" }}
                key={i}
                onClick={() => displayCuartos(espacio)}
              >
                <Card.Img src={getPhoto(espacio)} variant="top" alt="espacio" />
                <Card.Body>
                  <Card.Title>{espacio.name}</Card.Title>
                  <Card.Text>{espacio.address}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  return <ShowCuartos />;
}

export default Espacios;
