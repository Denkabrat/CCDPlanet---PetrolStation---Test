import {  useState } from 'react';
import { FuelTypes,setFuelTypes } from '../../interfaces/interfaces';
import './TypeFuel.scss';



export const TypeFuel = ({allFuelInfo,removeFuel,fuelTypes,setFuelColor,setFuelName,setFuelPrice,fuelName}:setFuelTypes) => {

     const [activeButton,setActiveButton] = useState(false);

     const resetFuelSettings = (): void => {
          removeFuel(1);
          setActiveButton(false);
          setFuelColor('#ffb800');
          setFuelPrice(42);
     }
   
    return(
          <div className='Main_Wrapper'>
               <div className='TypeFuel-wrapper'>
                    <div className="type-fuel-static">
                         <p className='type-fuel-static-text'>ТИП ТОПЛИВА</p>
                         </div>
                    <button onClick={()=> allFuelInfo?.id ?  resetFuelSettings() : alert('Бак пустой')} className='remove-fuel-button'>СЛИТЬ ТОПЛИВО</button>
               </div>
          

          <div className='type-fuel-buttons'>
               {
               fuelTypes.map((type: FuelTypes) => {
                    return(
                         <button disabled={allFuelInfo?.name ? true : false}
                                   className={!activeButton && type.id === 1 && !allFuelInfo?.id?
                                                                             "activeButtonClass" :
                                             type.name === allFuelInfo?.name ?
                                                                             'activeButtonClass' : 
                                             activeButton && type.name === fuelName ? 'activeButtonClass' : 'box-fuel'} 
                                   key={type.id} 
                                   onClick={()=> {
                                             setFuelName(type.name);
                                             setFuelPrice(type.price);
                                             setFuelColor(type.color);
                                             setActiveButton(true)
                                             }}>
                              <div className="inline-circles">
                                   <div style={{backgroundColor:type.color}} className="circle"></div>
                                   <div style={{backgroundColor:type.color}} className="circle"></div>
                                   <div style={{backgroundColor:type.color}} className="circle"></div>
                              </div>
                                   <p className='fuel-price'>{type.price} ₽</p>
                                   <p className='price-header'>Цена за 1 литр</p> 
                                   <p className={`fuel-name ${type.class}`}>{type.name}</p>
                         </button>  
                    )
               }) 
          }
          </div>
     </div>
    )
 }
 
 
