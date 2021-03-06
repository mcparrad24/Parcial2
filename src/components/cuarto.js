import React, { useState, useEffect } from "react";
import kitchen from "../assets/kitchen.png";
import living from "../assets/living-room.png";
import dinner from "../assets/dinner-room.png";
import Device from "./devices";
import Pie from "./pie";
import { Card, Col, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

function Cuarto(props) {
  const URL =
    "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";

  const [temporales, setTemporales] = useState([]);

  let cuartosTemp = [];

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("cuartos") === null) {
        setTemporales(["Loading..."]);
      } else {
        setTemporales(JSON.parse(localStorage.getItem("cuartos")));
      }
    } else {
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          if(JSON.parse(localStorage.getItem("cuartos")) !== null){
            if (JSON.parse(localStorage.getItem("cuartos")).length === 0){
              localStorage.setItem("cuartos", JSON.stringify([]));
            }
          }
          else{
            localStorage.setItem("cuartos", JSON.stringify([]));
          }
          setTemporales(res);
        });
    }
  }, []);

  function selectCuartos() {
    temporales.forEach((temp) => {
      if (temp.homeId === props.c.id) {
        cuartosTemp.push(temp);
      }
    });
  }

  function getPhoto(cuarto) {
    let name = String(cuarto.name);
    if (name.includes("Living room")) {
      return living;
    } else if (name.includes("Kitchen")) {
      return kitchen;
    } else if (name.includes("Dinner room")) {
      return dinner;
    }
  }

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [devices, setDevices] = useState({});

  function displayDevices(cuarto) {
    let esta = 0;
    let cuartosVisitados = JSON.parse(localStorage.getItem("cuartos"));

    if (cuartosVisitados !== null){
      cuartosVisitados.forEach((cu) => {
        if ((cu.homeId === cuarto.homeId) && (cu.name === cuarto.name)) {
          esta = 1;
        }
      });
      if (esta === 0) {
        cuartosVisitados.push(cuarto);
      }
    }
    else{
      cuartosVisitados = [];
      cuartosVisitados.push(cuarto);
    }
    console.log("aqui cuartos 9");
    localStorage.setItem("cuartos", JSON.stringify(cuartosVisitados));
    setDevices(cuarto);
    handleShow();
  }

  function ShowDevices() {
    selectCuartos();
    if (show) {
      return <Devices />;
    }
    return <NoDevices />;
  }

  function Devices() {
    return (
      <div>
        <Row xs={2} md={3} lg={4}>
          {cuartosTemp.map((cuarto, i) => (
            <Col>
              <Card
                style={{ width: "10rem", margin: "1rem" }}
                key={i}
                onClick={() => displayDevices(cuarto)}
              >
                <Card.Body>
                  <Card.Title>{cuarto.name}</Card.Title>
                </Card.Body>
                <Card.Img
                  src={getPhoto(cuarto)}
                  class="card-img-top"
                  alt="espacio"
                />
              </Card>
            </Col>
          ))}
          <Device d={devices} />
        </Row>
        <br/>
        <Row>
          <h3>
            <FormattedMessage id="Stats" />
          </h3>
        </Row>
        <br/>
        <Row className="justify-content-center">
          <h6>
            <FormattedMessage id="PowerUsage" />
          </h6>
        </Row>
        <br/>
        <Row className="justify-content-center">
          <Pie c={cuartosTemp} />
        </Row>
      </div>
    );
  }

  function NoDevices() {
    return (
      <div>
        <Row xs={2} md={3} lg={4}>
          {cuartosTemp.map((cuarto, i) => (
            <Col style={{ width: "10rem", marginBottom: "1rem" }}>
              <Card key={i} onClick={() => displayDevices(cuarto)}>
                <Card.Body>
                  <Card.Title>{cuarto.name}</Card.Title>
                </Card.Body>
                <Card.Img
                  src={getPhoto(cuarto)}
                  class="card-img-top"
                  alt="espacio"
                />
              </Card>
            </Col>
          ))}
        </Row>
        <br/>
        <Row>
          <h3>
            <FormattedMessage id="Stats" />
          </h3>
        </Row>
        <br/>
        <Row className="justify-content-center">
          <h6>
            <FormattedMessage id="PowerUsage" />
          </h6>
        </Row>
        <br/>
        <Row className="justify-content-center">
          <Pie c={cuartosTemp} />
        </Row>
      </div>
    );
  }

  return <ShowDevices />;
}

export default Cuarto;
