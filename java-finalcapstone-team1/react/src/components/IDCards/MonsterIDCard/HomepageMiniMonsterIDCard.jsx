import { useEffect, useState } from "react";
import MonsterService from "../../../services/MonsterService";
import styles from "./HomepageMonsterIdCard.module.css";

export default function HomepageMiniMonsterIDCard({ monsterId }) {
  const [monsterData, setMonsterData] = useState({});

  useEffect(() => {
    MonsterService.getMonsterById(monsterId)
      .then((res) => {
        setMonsterData(res.data);
      })
      .catch((err) => {
        console.error("Error loading monster data:", err);
      });
  }, [monsterId]);

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
  return (
    <div
      className={styles.cardContainer}
      data-tier={monsterData.monsterTier}
    >
      <div className={styles.cardHeader}>
        <h2 className={styles.monsterName}>{monsterData.monsterName}</h2>
        <p className={styles.monsterLevel}>Level: {monsterData.monsterLevel}</p>
      </div>

      <div className={styles.profilePhoto}>
        <img
          src={getMonsterImage(monsterData.monsterTier)}
          alt="Monster Portrait"
        />
      </div>

      <div className={styles.statsBlock}>
        <p>{monsterData.monsterDescription}</p>
      </div>
    </div>
  );
}


