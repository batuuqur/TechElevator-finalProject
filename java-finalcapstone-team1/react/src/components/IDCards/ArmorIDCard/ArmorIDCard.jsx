import { useState, useEffect } from 'react';
import ArmorService from '../../../services/ArmorService';
import styles from './ArmorIDCard.module.css';

export default function ArmorIDCard({ armorData, onClick, style }) {
  const [internalArmorData, setInternalArmorData] = useState({});
  const [armorTierName, setArmorTierName] = useState("");

  // Get armor data when component mounts or when armorData changes
  useEffect(() => {
    setInternalArmorData(armorData);
    findArmorTierName(armorData.armorTier);
  }, [armorData]);

  function findArmorTierName(tier) {
    switch (tier) {
      case 0: setArmorTierName("Rusty"); break;
      case 1: setArmorTierName("Steel"); break;
      case 2: setArmorTierName("Great"); break;
      case 3: setArmorTierName("Enchanted"); break;
      case 4: setArmorTierName("Legendary"); break;
      default: setArmorTierName(""); break;
    }
  }

  
  function getArmorImage(className) {
    switch (className) {
      case 'Barbarian':
        return '/Public-Assets/rogue-armor.png';
      case 'Archer':
        return '/Public-Assets/barbarian-armor.png';
      case 'Rogue':
        return '/Public-Assets/archer-armor.png';
      default:
        return 'https://placehold.co/80x80?text=Character';
    }
  }

    if(!internalArmorData){
        return <></>
    }

  return (
    <div
      className={styles.cardContainer}
      onClick={onClick}
      style={style}
      data-tier={internalArmorData.armorTier || 1}
    >
      {/* Profile Photo Section with Tier and Gold */}
      <div className={styles.profilePhoto}>
        <img
          src={getArmorImage(armorData.classRequirement)}
          // alt={`${internalArmorData.armor_name || 'Armor'} image`}
        />
        <div className={styles.smallInfo}>
          <div className={styles.tier}>
            <span>{armorTierName}</span>
          </div>
          <div className={styles.gold}>
            <span>Gold: {internalArmorData.price}</span>
          </div>
        </div>
      </div>

      {/* Main Information */}
      <div className={styles.mainInfo}>
        {/* Header */}
        <div className={styles.header}>
          <h1>{internalArmorData.armor_name}</h1>
        </div>

        {/* Level Information */}
        <div className={styles.level}>
          <span>Level:</span>{internalArmorData.levelRequirement}
        </div>

        {/* Defense Stats */}
        <div className={styles.statsBlock}>
          <span>Defence:</span>{internalArmorData.armor_class_integer}
        </div>

        {/* Description */}
        <div className={styles.weapon}>
          {internalArmorData.armorDescription}
        </div>
      </div>
    </div>
  );
}