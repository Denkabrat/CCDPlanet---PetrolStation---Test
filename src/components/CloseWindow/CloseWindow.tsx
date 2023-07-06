import { ICloseWindow } from "../../interfaces/interfaces";
import "./CloseWindow.scss";

export const CloseWindow = ({ changeWindowStatus }: ICloseWindow) => {
  return (
    <div>
      <button onClick={changeWindowStatus} className="close-window-wrapper">
        <div className="close-window-box">Esc</div>
        <p className="close-window-text">Закрыть окно</p>
      </button>
    </div>
  );
};