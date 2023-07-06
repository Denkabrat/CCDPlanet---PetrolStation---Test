import { Range, getTrackBackground } from 'react-range';
import  { GasSVG } from "../Svg/GasSVG";
import { useHttp } from '../../hooks/http.hook';
import { FuelInfo, ISelect} from '../../interfaces/interfaces';
import { useEffect} from 'react';
import './Select.scss'


export const Select = ({allFuelInfo,setAllFuelInfo,setFuelInfo,rangeValue,setRangeValue,fuelPrice,fuelColor}:ISelect) => {

   const {request} = useHttp();
   const MIN: number = 0;
   const MAX: number = 100;


   useEffect(()=>{
      request('http://localhost:3001/activeFuel','GET')
      .then((res:FuelInfo[])=> {
         res.map(item => setAllFuelInfo(item))
      })

      //eslint-disable-next-line
   },[request])

      

   return(
      <div className='Select-wrapper'>

            <div className="range-scale-wrapper">
               <div className="quantity-fuel-static">
               <p className='quantity-fuel-static-text'>КОЛ-ВО ТОПЛИВА</p>
            </div>
      
               <div className='main-range-fuel'>
                  <div style={allFuelInfo?.id ? {backgroundColor:allFuelInfo.color} : {backgroundColor:fuelColor}} className="fake-range-type-fuel"></div>
                     <div className="fake-body-scale"></div>
                           <Range
                              step={1}
                              min={0}
                              max={100}
                              values={rangeValue}
                              onChange={(values) => setRangeValue(values)}
                              renderTrack={({ props, children }) => (
                                 <div className='body-scale' {...props} style={{
                                       background: getTrackBackground({
                                       values: rangeValue,
                                       colors: ["#FFF", "#ffffff00"],
                                       min: MIN,
                                       max: MAX}),
                                       height:'5px',
                                       }}>     
                                    {children}
                                 </div>
                              )}
                              renderThumb={({ props }) => (
                     <div className='head-scale' {...props}/>)}/></div>
                        <div className="min-max-scale">
                              <p className='min-scale'>мин.</p>
                              <p className='max-scale'>макс.</p>
                        </div>
               </div>
               
                  <div className="price_box">
                        <div className="fuel-price-static"><p className='fuel-price-static-text'>СТОИМОСТЬ</p></div>
                           <div className="fuel-counter-button-wrapper">
                              <div className="fuel-price-counter">{allFuelInfo?.price ? rangeValue[0] * allFuelInfo.price : fuelPrice * rangeValue[0]} ₽</div>
                              <button onClick={()=> !allFuelInfo!?.id ? setFuelInfo() : alert('Машина уже заправлена')} className='fuel-button-pay'><GasSVG id='wallet'/><p className='fuel-pay-text'>Оплатить</p></button>
                        </div>
                  </div>
            </div>
   )
}


