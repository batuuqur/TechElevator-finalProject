import React from "react";
import styles from './ClassDetailCard.module.css';

export default function ClassDetailCard({ classString, description, style , onClick}) {

    function getClassImage(className) {
      switch (className.toLowerCase()) {
        case 'barbarian':
          return '/Public-Assets/New-barbarian-icon.png';
        case 'archer':
          return '/Public-Assets/New-ranger-icon.png';
        case 'rogue':
          return '/Public-Assets/New-archer-icon.png';
        default:
          return 'https://via.placeholder.com/100x100';
      }
    }

    return (
        <div className={styles.cardContainer} style={style} onClick={onClick}>
            <div className={styles.profilePhoto}>
                <img 
                  src={getClassImage(classString)} 
                  alt={`${classString} icon`}
                />
            </div>

            <div className={styles.infoContent}>
                <div className={styles.classNameContainer}>
                    <h1>{classString}</h1>
                </div>
                <div className={styles.description}>
                    <h2>{description}</h2>
                </div>
            </div>
        </div>
    )
}
