import { useState, useEffect } from 'react';
import styles from './WeaponIDCard.module.css';

export default function WeaponIDCard({ weaponData, onClick, style }) {
  const [internalWeaponData, setInternalWeaponData] = useState({});
  const [weaponTierName, setWeaponTierName] = useState("");

  useEffect(() => {
    setInternalWeaponData(weaponData);
    findWeaponTierName(weaponData.weaponTier);
  }, [weaponData]);

  function findWeaponTierName(tier) {
    switch (tier) {
      case 0: setWeaponTierName("Rusty"); break;
      case 1: setWeaponTierName("Steel"); break;
      case 2: setWeaponTierName("Great"); break;
      case 3: setWeaponTierName("Enchanted"); break;
      case 4: setWeaponTierName("Legendary"); break;
      default: setWeaponTierName(""); break;
    }
  }

  
  function getWeaponImage(className) {
    switch (className) {
      case 'Barbarian':
        return '/Public-Assets/axe-icon.png';
      case 'Archer':
        return '/Public-Assets/bow-icon.png';
      case 'Rogue':
        return '/Public-Assets/dagger-icon.png';
      default:
        return 'https://placehold.co/80x80?text=Placeholder\nWeapon\nImage';
    }
  }
    if(!internalWeaponData){
        return <></>
    }

  return (
    <div
      className={styles.cardContainer}
      onClick={onClick}
      style={style}
      data-tier={internalWeaponData.weaponTier || 1}
    >
      {/* Left Column: Image + Tier/Gold */}
      <div className={styles.profilePhoto}>
        <img
          src={getWeaponImage(weaponData.classRequirement)}
          alt={`${internalWeaponData.name || 'Weapon'} image`}
        />
        <div className={styles.smallInfo}>
          <div className={styles.tier}>
            <span>{weaponTierName}</span>
          </div>
          <div className={styles.gold}>
            <span>Gold: {internalWeaponData.price}</span> 
          </div>
        </div>
      </div>

      {/* Right Column: Name + Stats + Description */}
      <div className={styles.mainInfo}>
        <div className={styles.header}>
          <h1>{internalWeaponData.name}</h1>
        </div>

        <div className={styles.level}>
          <span>Level:</span> {internalWeaponData.levelRequirement}
        </div>

        <div className={styles.statsBlock}>
          <span>Damage:</span> {internalWeaponData.damage}
        </div>

        <div className={styles.weapon}>
          {internalWeaponData.weaponDescription}
        </div>
      </div>
    </div>
  );
}