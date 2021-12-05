import React, { useState, useEffect } from "react";
import kitchen from "../assets/kitchen.png";
import living from "../assets/living-room.png";
import dinner from "../assets/dinner-room.png";
import Device from "./devices";
import { Card, Col, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

function Cuarto(props) {
  const URL =
    "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";

  const [temporales, setTemporales] = useState([]);
  const [cuartos, setCuartos] = useState([]);

  let cuartosTemp = [];

  let cuartosVisitados = [];

  /*
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        console.log("Res", res);
        setTemporales(res);
      })
  }, []);
  */

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
          setTemporales(res);
        });
    }
  }, []);

  function selectCuartos() {
    temporales.forEach((temp) => {
        if (temp.homeId === props.c.id){
          cuartos.push(temp)
        }
    })
    setCuartos(cuartosTemp);
    console.log(cuartos);
  };

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
    cuartosVisitados.forEach((cu) => {
      if (cu === cuarto) {
        esta = 1;
      }
    });
    if (esta === 0) {
      cuartosVisitados.push(cuarto);
    }
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
          {cuartos.map((cuarto, i) => (
            <Col>
              <Card
                style={{ width: "10rem" }}
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
        <Row>
          <h3>
            <FormattedMessage id="Stats" />
          </h3>
        </Row>
        
      </div>
    );
  }

  function NoDevices() {
    return (
      <div>
        <Row xs={2} md={3} lg={4}>
          {cuartos.map((cuarto, i) => (
            <Col style={{ width: "10rem" }}>
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
        <Row>
          <h3>
            <FormattedMessage id="Stats" />
          </h3>
        </Row>
      </div>
    );
  }

  return <ShowDevices />;
}

export default Cuarto;
