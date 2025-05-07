import { useState, useEffect } from 'react';
import CharacterService from '../../../services/CharacterService';
import ArmorService from '../../../services/ArmorService';
import WeaponsService from '../../../services/WeaponsService';
import styles from './CharacterIDCard.module.css';

export default function CharacterIDCard({ characterId, onClick, selected, selectable = false, characterDTOData }) {
  const [characterData, setCharacterData] = useState({});
  const [armorData, setArmorData] = useState({});
  const [weaponData, setWeaponData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Get character data when component mounts
  useEffect(() => {
    setIsLoading(true);
    handleGetCharacter();
  }, [characterId]);

  // Get armor and weapon data when characterData changes
  useEffect(() => {
    // Only run if we have character data with IDs
    if (characterData && characterData.armor_id) {
      handleGetArmor();
    }
    if (characterData && characterData.weapon_id) {
      handleGetWeapon();
    }

    // If we have character data, we can consider loading complete
    if (Object.keys(characterData).length > 0) {
      setIsLoading(false);
    }
  }, [characterData]);

  function handleGetCharacter() {
    if(characterDTOData){
      setCharacterData(characterDTOData)
    }
    else
    {
      CharacterService.getCharacterById(characterId)
          .then(result => {
            setCharacterData(result.data);
          })
          .catch(error => {
            console.error(":-/ Failed to get characters: ", error);
            setIsLoading(false);
          });
    }
  }

  function handleGetArmor() {
    ArmorService.getArmorById(characterData.armor_id)
      .then(result => {
        setArmorData(result.data);
      })
      .catch(error => {
        console.error(":-/ Failed to get armor: ", error);
      });
  }

  function handleGetWeapon() {
    WeaponsService.getWeaponById(characterData.weapon_id)
      .then(result => {
        setWeaponData(result.data);
      })
      .catch(error => {
        console.error(":-/ Failed to get weapon: ", error);
      });
  }

  function getCharacterImage(className) {
    switch (className) {
      case 'Barbarian':
        return '/Public-Assets/New-barbarian-icon.png';
      case 'Archer':
        return '/Public-Assets/New-ranger-icon.png';
      case 'Rogue':
        return '/Public-Assets/New-archer-icon.png';
      default:
        return 'https://placehold.co/80x80?text=Character';
    }
  }

  // Get level color based on character level
  function getLevelColor(level) {
    if (!level) return '#f5e6c8';
    
    if (level >= 20) return '#F1C40F'; // Gold for highest levels
    if (level >= 15) return '#9B59B6'; // Purple for high levels
    if (level >= 10) return '#2980B9'; // Blue for medium-high levels
    if (level >= 5) return '#27AE60';  // Green for medium levels
    return '#f5e6c8';                  // Default for low levels
  }

  const stats = [
    { label: "Strength", value: characterData.strength_integer },
    { label: "Dexterity", value: characterData.dexterity_integer },
    { label: "Constitution", value: characterData.constitution_integer },
    { label: "Wisdom", value: characterData.wisdom_integer },
    { label: "Intelligence", value: characterData.intelligence_integer },
    { label: "Charisma", value: characterData.charisma_integer }
  ];

  return (
    <div 
      className={selectable 
        ? `${styles.cardContainer} ${selected ? styles.selected : styles.notSelected}` 
        : styles.cardContainer}
      onClick={onClick ? onClick : undefined} 
      style={onClick ? { cursor: 'pointer' } : {}}
      data-class={characterData.characterClass}
    >
      {/* Profile Photo with Class */}
      <div className={styles.profilePhoto}>
        <img 
          src={getCharacterImage(characterData.characterClass)} 
          alt={`${characterData.characterName || 'Character'} profile`} 
        />
        <div className={styles.photoInfo}>
          <div>
            <span>{characterData.characterClass}</span>
          </div>
          <div>
            <span className={styles.levelText}>Level</span>{characterData.characterLevel}
          </div>
        </div>
      </div>
    
      {/* Main Information */}
      <div className={styles.mainInfo}>
        {/* Header */}
        <div className={styles.header}>
          <h1>{characterData.characterName || 'Loading...'}</h1>
        </div>
    
        {/* Equipment */}
        <div className={styles.armor}>
          <span>Armor:</span>{armorData.armor_name || 'None'}
        </div>
    
        <div className={styles.weapon}>
          <span>Weapon:</span>{weaponData.name || 'None'}
        </div>
        
        {characterData.gold !== undefined && (
          <div className={styles.armor}>
          <span className={styles.goldLabel}>Gold:</span>
          <span>{characterData.gold}</span>
        </div>
        )}
      </div>
    
      {/* Stats Grid */}
      <div className={styles.statsBlock}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statRow}>
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
