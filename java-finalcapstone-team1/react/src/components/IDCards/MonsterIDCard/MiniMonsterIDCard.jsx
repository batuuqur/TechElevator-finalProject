import { useState, useEffect } from 'react';
import MonsterService from '../../../services/MonsterService';
import styles from './MonsterIDCard.module.css';

export default function MiniMonsterIDCard({ monsterId, onClick, selected, selectable = false, disabled }) {
  const [monsterData, setMonsterData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleGetMonster();
  }, [monsterId]);

  function handleGetMonster() {
    setLoading(true);
    MonsterService.getMonsterById(monsterId)
      .then(result => {
        setMonsterData(result.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(":-/ Failed to get monsters: ", error);
        setError("Failed to load monster data");
        setLoading(false);
      });
  }

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
  
  if (loading && !monsterData.monsterName) {
    return <div className={styles.cardContainer}>Loading monster data...</div>;
  }

  if (error) {
    return <div className={styles.cardContainer}>Error: {error}</div>;
  }

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
      {/* Photo */}
      <div className={styles.profilePhoto}>
        <img 
           src={getMonsterImage(monsterData.monsterTier)}
          alt="Monster Profile" 
        />
      </div>

      {/* Main Info */}
      <div className={styles.mainInfo}>
        <div className={styles.header}>
          <h1>{monsterData.monsterName}</h1>
        </div>
        Level: {monsterData.monsterLevel}
        <div>
          Tier: {monsterData.monsterTier}
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsBlock}>
        <p>{monsterData.monsterDescription}</p>
      </div>
    </div>
  );
}
