import React, { useState, useEffect } from "react";
import kitchen from "../assets/kitchen.png";
import living from "../assets/living-room.png";
import dinner from "../assets/dinner-room.png";

function Cuarto(props) {
  const URL =
    "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";

  let cuartos = [];

  const [temporales, setTemporales] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        console.log("Res", res);
        setTemporales(res);
        selectCuartos();
      });
  }, []);

  function selectCuartos() {
    temporales.map((temp) => {
        if (temp.homeId === props.c.id) cuartos.push(temp)
    })}



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

  return (
    <div>
        <div class="row">
        <h3>My rooms</h3>
        </div>
        <div class="row">
        {cuartos.map((cuarto, i) => (
            <div class="col">
            <div class="card" key={i}>
                <div class="card-body">
                <h6 class="card-title">{cuarto.name}</h6>
                </div>
                <img src={getPhoto(cuarto)} class="card-img-top" alt="espacio" />
            </div>
            </div>
        ))}
        </div>
    </div>
  );
}

export default Cuarto;
