import { useState, useEffect } from 'react';
import WeaponsService from '../../../services/WeaponsService';
import bigStyles from './WeaponIDCard.module.css';
import miniStyles from "./MiniWeaponIDCard.module.css"

export default function MiniWeaponIDCard({ weaponData , isEmpty, style, onClick}){

    const[internalWeaponData, setInternalWeaponData] = useState();
    
     // Get monster data when component mounts
     useEffect(() => {
        setInternalWeaponData(weaponData)
    }, [weaponData]);

     if(isEmpty)
     {
         return (
         <div className={miniStyles.emptyCardContainer} style={style}>
             <div className={bigStyles.mainInfo}>
                 <div className={miniStyles.header}>
                     <h1>No Weapon Selected</h1>
                 </div>
             </div>
         </div>
         )
     }

     if(!internalWeaponData){
         return(
         <div className={miniStyles.emptyCardContainer} style={style}>
             <div className={miniStyles.mainInfo}>
                 <div className={miniStyles.header}>
                     <h1></h1>
                 </div>
             </div>
         </div>)
     }

      return (
        <>
          <div className={miniStyles.cardContainer} style={style} onClick={onClick}>
            {/* Main Info */}
            <div className={miniStyles.mainInfo}>
              {/* Header */}
              <div className={miniStyles.header}>
                <h1>{internalWeaponData.name}</h1>
                {/*<p>{weaponData.classRequirement}</p>*/}
              </div>
      
              {/* Weapon */}
              <div className={bigStyles.weapon}>
                {/*<span></span>{internalWeaponData.weaponDescription}*/}
              </div>
            </div>
          </div>
        </>
      );
}