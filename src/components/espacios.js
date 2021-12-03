import React, { useState, useEffect } from "react";
import casa from "../assets/house.png";
import apartamento from "../assets/apartment.png";
import Cuarto from "./cuarto";

function Espacios() {
  const URL =
    "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";

  const [espacios, setEspacios] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        console.log("Res", res);
        setEspacios(res);
      });
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
      <div class="container-fluid">
        <div class="row">
          {espacios.map((espacio, i) => (
            <div class="col">
              <div class="card" key={i} onClick={() => displayCuartos(espacio)}>
                <img
                  src={getPhoto(espacio)}
                  class="card-img-top"
                  alt="espacio"
                />
                <div class="card-body">
                  <h6 class="card-title">{espacio.name}</h6>
                  <small class="card-text">{espacio.address}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Cuarto c={cuarto}/>
      </div>
    );
  }

  function NoCuartos() {
    return (
      <div class="container-fluid">
        <div class="row">
          {espacios.map((espacio, i) => (
            <div class="col">
              <div class="card" key={i} onClick={() => displayCuartos(espacio)}>
                <img
                  src={getPhoto(espacio)}
                  class="card-img-top"
                  alt="espacio"
                />
                <div class="card-body">
                  <h6 class="card-title">{espacio.name}</h6>
                  <small class="card-text">{espacio.address}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <ShowCuartos />;
}

export default Espacios;
