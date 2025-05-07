import { useState, useEffect } from 'react';
import MonsterService from '../../../services/MonsterService';
import styles from './MonsterIDCard.module.css';

export default function MonsterIDCard({ monsterId, onClick, selected, selectable = false }) {
  const [monsterData, setMonsterData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMonsterData();
  }, [monsterId]);

  function fetchMonsterData() {
    setLoading(true);
    MonsterService.getMonsterById(monsterId)
      .then(result => {
        setMonsterData(result.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to get monster data:", err);
        setError("Failed to load monster data");
        setLoading(false);
      });
  }
  console.log(monsterData);

  const stats = [
    { label: "Strength", value: monsterData.strengthInteger },
    { label: "Dexterity", value: monsterData.dexterityInteger },
    { label: "Constitution", value: monsterData.constitutionInteger },
    { label: "Wisdom", value: monsterData.wisdomInteger },
    { label: "Intelligence", value: monsterData.intelligenceInteger },
    { label: "Charisma", value: monsterData.charismaInteger }
  ];

  function getMonsterImage(monsterTier) {
    switch (monsterTier) {
      case 1:
        return '/Public-Assets/monster-tier-images/lesserMonsterTwo.png';
      case 2:
        return '/Public-Assets/monster-tier-images/direMonsterTwo.png';
      case 3:
        return '/Public-Assets/monster-tier-images/mythicMonsterTwo.png';
      case 4:
        return '/Public-Assets/monster-tier-images/legendaryMonsterTwo.png';
      default:
        return 'https://placehold.co/80x80?text=Monster';
    }
  }

  if (loading) return <div className={styles.cardContainer}>Loading...</div>;
  if (error) return <div className={styles.cardContainer}>{error}</div>;

  const cardClasses = selectable
    ? `${styles.cardContainer} ${selected ? styles.selected : styles.notSelected}`
    : styles.cardContainer;

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      data-tier={monsterData.monsterTier}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      {/* Profile Photo */}
      <div className={styles.profilePhoto}>
        <img
          src={getMonsterImage(monsterData.monsterTier)}
          alt={`${monsterData.monsterName || 'Monster'} profile`}
        />
        <div className={styles.photoInfo}>
          <div>
            <span className={styles.levelText}>Level </span>{monsterData.monsterLevel}
          </div>
          <div>
            <span className={styles.levelText}>Tier </span>{monsterData.monsterTier}
          </div>
        </div>
      </div>

      {/* Main Info */}
      <div className={styles.mainInfo}>
        <div className={styles.header}>
          <h1>{monsterData.monsterName}</h1>
        </div>
        <div className={styles.armor}>
          <span>Armor: </span>{monsterData.armorType || 'None'}
        </div>
        <div className={styles.weapon}>
          <span>Weapon: </span>{monsterData.weaponType || 'None'}
        </div>
        <div className={styles.description}>
          <p>{monsterData.monsterDescription || 'No description available.'}</p>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsBlock}>
        {stats.map(stat => (
          <div key={stat.label} className={styles.statRow}>
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
