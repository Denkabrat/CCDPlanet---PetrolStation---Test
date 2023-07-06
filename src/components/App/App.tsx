import { Header } from "../Header/Header";
import { TypeFuel } from "../TypeFuel/TypeFuel";
import { Select } from "../Select/Select";
import { CloseWindow } from "../CloseWindow/CloseWindow";
import { useState, useEffect, useCallback } from "react";
import { useHttp } from "../../hooks/http.hook";
import { FuelInfo } from "../../interfaces/interfaces";
import "./App.scss";

function App() {
  
  const [fuelTypes, setFuelTypes] = useState([]);
  const [fuelName, setFuelName] = useState<string>("АИ 92");
  const [fuelPrice, setFuelPrice] = useState<number>(42);
  const [fuelColor, setFuelColor] = useState<string>("#ffb800");
  const [rangeValue, setRangeValue] = useState<number[]>([0]);
  const [closeWindow, setCloseWindow] = useState<boolean>(true);
  const [allFuelInfo,setAllFuelInfo] = useState<FuelInfo>();
  const { request } = useHttp();




  let appClassName = "App";

  if (closeWindow) {
    appClassName += " opened";
  } else {
    appClassName += " closed";
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      changeWindowStatus();
    }
  });

  const changeWindowStatus = () => {
    setCloseWindow(false);
    document.body.style.background = 'inherit';
  };

  const setFuelInfo = async () => {
    const fuelInfo: FuelInfo = {
      name: fuelName,
      quantity: rangeValue[0],
      color: fuelColor,
      price: fuelPrice,
      id:1
    };

    await request(
      "http://localhost:3001/activeFuel",
      "POST",
      JSON.stringify(fuelInfo)
    )

    setAllFuelInfo(fuelInfo);
    setRangeValue([0]);
  };



  const removeFuel = useCallback(
    (id: number): void => {

      request(`http://localhost:3001/activeFuel/${id}`, "DELETE")
        .then((data) => setAllFuelInfo(data))
        .catch((err) => console.log(err));

        setRangeValue([0]);
      // eslint-disable-next-line
    },
    [request]
  );

  useEffect(()=>{
        request("http://localhost:3001/allFuelTypes", "GET")
        .then((res) => setFuelTypes(res));

  },[request])

    

  return (
    <div className={appClassName}>
      <Header changeWindowStatus={changeWindowStatus}/>
          <TypeFuel
            allFuelInfo={allFuelInfo}
            removeFuel={removeFuel}
            fuelTypes={fuelTypes}
            fuelName={fuelName}
            setFuelName={setFuelName}
            setFuelPrice={setFuelPrice}
            setFuelColor={setFuelColor}
          />
          <Select
            setAllFuelInfo={setAllFuelInfo}
            allFuelInfo={allFuelInfo}
            setFuelInfo={setFuelInfo}
            rangeValue={rangeValue}
            setRangeValue={setRangeValue}
            fuelPrice={fuelPrice}
            fuelColor={fuelColor}
          />
      <CloseWindow changeWindowStatus={changeWindowStatus} />
    </div>
  );
}

export default App;
