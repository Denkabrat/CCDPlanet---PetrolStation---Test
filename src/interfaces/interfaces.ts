import { Dispatch, SetStateAction } from "react";

export interface Props {
  id: string;
}

export interface FuelTypes {
  id: number;
  name: string;
  price: number;
  color: string;
  class: string;
}

export interface FuelInfo {
  name: string;
  quantity: number;
  color: string;
  price: number;
  id:number
}

export interface setFuelTypes {
  fuelTypes: FuelTypes[];
  setFuelColor: Dispatch<SetStateAction<string>>;
  setFuelName: Dispatch<SetStateAction<string>>;
  setFuelPrice: Dispatch<SetStateAction<number>>;
  fuelName: string;
  removeFuel: (id: number) => void;
  allFuelInfo: FuelInfo | undefined ;
}

export interface ISelect {
  setAllFuelInfo:Dispatch<SetStateAction<FuelInfo | undefined>>;
  allFuelInfo: FuelInfo | undefined;
  setFuelInfo: () => void;
  rangeValue: number[];
  setRangeValue: Dispatch<SetStateAction<number[]>>;
  fuelPrice: number;
  fuelColor: string;
}

export interface IHeader {
  changeWindowStatus: () => void;
}

export interface ICloseWindow extends IHeader {}