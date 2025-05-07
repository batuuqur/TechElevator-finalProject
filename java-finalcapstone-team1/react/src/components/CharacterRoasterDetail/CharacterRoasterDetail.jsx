import { useEffect, useState } from 'react';
import ArmorIDCard from '../IDCards/ArmorIDCard/ArmorIDCard';
import WeaponIDCard from '../IDCards/WeaponIDCard/WeaponIDCard';
import styles from './CharacterRoasterDetail.module.css';

function getDetailImage(className) {
  switch (className) {
    case 'Barbarian':
      return '/Public-Assets/barbarian-character.png';
    case 'Archer':
      return '/Public-Assets/archer-character.png';
    case 'Rogue':
      return '/Public-Assets/rogue-character.png';
    default:
      return 'https://placehold.co/80x80?text=Placeholder\nWeapon\nImage';
  }
}


export default function CharacterRosterDetails({ characterDTO }) {
// console.log(characterDTO);
  return (
    <div className={styles.characterDetailsContainer}>
      <div className={styles.profilePicture}>
      <img 
          src={getDetailImage(characterDTO?.characterData?.characterClass)} 
          alt={`${characterDTO?.characterData?.characterClass || 'Character'} portrait`} 
        />
      </div>

      
      <div className={styles.characterStats}>
        <h3 className={styles.sectionTitle}>Character Stats</h3>
        <div><span className={styles.label}>Class:</span> <span className={styles.value}>{characterDTO.characterData.characterClass}</span></div>
        <div><span className={styles.label}>Level:</span> <span className={styles.value}>{characterDTO.characterData.characterLevel}</span></div>
        <div><span className={styles.label}>Strength:</span> <span className={styles.value}>{characterDTO.characterData.strength_integer}</span></div>
        <div><span className={styles.label}>Dexterity:</span> <span className={styles.value}>{characterDTO.characterData.dexterity_integer}</span></div>
        <div><span className={styles.label}>Constitution:</span> <span className={styles.value}>{characterDTO.characterData.constitution_integer}</span></div>
        <div><span className={styles.label}>Wisdom:</span> <span className={styles.value}>{characterDTO.characterData.wisdom_integer}</span></div>
        <div><span className={styles.label}>Intelligence:</span> <span className={styles.value}>{characterDTO.characterData.intelligence_integer}</span></div>
        <div><span className={styles.label}>Charisma:</span> <span className={styles.value}>{characterDTO.characterData.charisma_integer}</span></div>
        <div><span className={styles.label}>Monsters Killed:</span> <span className={styles.value}>{characterDTO.characterData.number_of_battles}</span></div>
      </div>

        <div className={styles.weaponCard}>
            <WeaponIDCard weaponData={characterDTO.weaponData} />
        </div>
        <div className={styles.armorCard}>
            <ArmorIDCard armorData={characterDTO.armorData} />
        </div>
    </div>
  );
}