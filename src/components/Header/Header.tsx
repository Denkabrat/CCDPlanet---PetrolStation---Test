import { IHeader } from "../../interfaces/interfaces";
import { GasSVG } from "../Svg/GasSVG";
import "./Header.scss";

export const Header = ({ changeWindowStatus }: IHeader) => {
  return (
    <header className="header-gas">
      <div className="header-content">
        <div className="header-left">
          <GasSVG id="gas" />
          <p className="header-text">АЗС #14</p>
        </div>
        <div className="header-right">
          <button onClick={changeWindowStatus} className="close-button">
            <GasSVG id="close" />
          </button>
        </div>
      </div>
    </header>
  );
};
