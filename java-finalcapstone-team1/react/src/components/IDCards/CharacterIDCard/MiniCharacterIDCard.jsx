
import { useState, useEffect } from 'react';
import styles from './MiniCharacterIDCard.module.css'

export default function MiniCharacterIDCard({ characterData , style , onClick }){


    const[internalCharacterData, setInternalCharacterData] = useState({});

     // Get character data when component mounts
     useEffect(() => {
         setInternalCharacterData(characterData)
    }, [characterData]);

      return (
          <div style={style} onClick={onClick} className={styles.cardContainer}>
            <div className={styles.mainInfo}>
              <div className={styles.header}>
                <h1>{internalCharacterData.characterName}</h1>
              </div>
            </div>
          </div>
      );
}