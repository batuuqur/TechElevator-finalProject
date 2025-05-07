import { useState, useEffect } from 'react';
import ArmorService from '../../../services/ArmorService';
import miniStyles from './MiniArmorIDCard.module.css';

export default function MiniArmorIDCard({ armorData , isEmpty, style, onClick}){

    const[internalArmorData, setInternalArmorData] = useState();
    
     // Get monster data when component mounts
     useEffect(() => {
        setInternalArmorData(armorData)
    }, [armorData]);

     if(isEmpty)
     {
         return(
             <div className={miniStyles.emptyCardContainer} style={style}>
                 <div className={miniStyles.mainInfo}>
                     <div className={miniStyles.header}>
                         <h1>No Armor Selected</h1>
                     </div>
                 </div>
             </div>
         )
     }

    if(!internalArmorData){
        return (
        <div className={miniStyles.emptyCardContainer} style={style}>
            <div className={miniStyles.mainInfo}>
                <div className={miniStyles.header}>
                    <h1>No Armor Selected</h1>
                </div>
            </div>
        </div>
        )
    }

      return (
          <div className={miniStyles.cardContainer} style={style} onClick={onClick}>
            <div className={miniStyles.mainInfo}>
              <div className={miniStyles.header}>
                <h1>{internalArmorData.armor_name}</h1>
              </div>
            </div>
          </div>
      );
}