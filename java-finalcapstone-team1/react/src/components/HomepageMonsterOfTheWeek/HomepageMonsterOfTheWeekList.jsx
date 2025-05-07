import { useEffect, useState } from "react";
import MonsterService from "../../services/MonsterService";
import styles from "./HomepageMonsterOfTheWeekList.module.css";
import HomepageMiniMonsterIDCard from "../IDCards/MonsterIDCard/HomepageMiniMonsterIDCard";

export default function HomepageMonsterOfTheWeekList() {
  const [monsters, setMonsters] = useState({
    "1-3": [],
    "4-6": [],
    "7-9": [],
    "10": [],
  });
  const tiers = ["1-3", "4-6", "7-9", "10"];
  const [currentTierIndex, setCurrentTierIndex] = useState(0);
  const currentTier = tiers[currentTierIndex];


  useEffect(() => {
    MonsterService.getActiveMonsters()
      .then((res) => {
        const all = res.data;
        const grouped = {
          "1-3": all.filter((m) => m.monsterLevel >= 1 && m.monsterLevel <= 3),
          "4-6": all.filter((m) => m.monsterLevel >= 4 && m.monsterLevel <= 6),
          "7-9": all.filter((m) => m.monsterLevel >= 7 && m.monsterLevel <= 9),
          "10": all.filter((m) => m.monsterLevel >= 10),
        };
        setMonsters(grouped);
      })
      .catch((err) => {
        console.error("Failed to fetch monsters:", err);
      });
  }, []);

  const displayHideStyle = {display: "none"};

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>MONSTER OF THE WEEK</h2>
  
      <div className={styles.navigation}>
        <button
          className={styles.navButton}
          onClick={() =>
            setCurrentTierIndex((prev) =>
              (prev - 1 + tiers.length) % tiers.length
            )
          }
        >
          ⮘
        </button>

        <span className={styles.tierName}>
          {currentTier === "1-3"
            ? "LESSER"
            : currentTier === "4-6"
            ? "DIRE"
            : currentTier === "7-9"
            ? "MYTHIC"
            : "LEGENDARY"}
        </span>

        <button
          className={styles.navButton}
          onClick={() =>
            setCurrentTierIndex((prev) =>
              (prev + 1) % tiers.length
            )
          }
        >
          ⮚
        </button>
      </div>

  
      <div className={styles.cardGrid} style={currentTier === "1-3" ? {} : displayHideStyle}>
        {monsters["1-3"].slice(0, 3).map((monster) => (
          <div className={styles.card} key={monster.monsterId}>
            <HomepageMiniMonsterIDCard monsterId={monster.monsterId} />
            {/* <HomepageMiniMonsterIDCard monsterId={monster.mon}/> */}
          </div>
        ))}
      </div>
      <div className={styles.cardGrid} style={currentTier === "4-6" ? {} : displayHideStyle}>
        {monsters["4-6"].slice(0, 3).map((monster) => (
          <div className={styles.card} key={monster.monsterId}>
            <HomepageMiniMonsterIDCard monsterId={monster.monsterId} />
            {/* <HomepageMiniMonsterIDCard monsterId={monster.mon}/> */}
          </div>
        ))}
      </div>
      <div className={styles.cardGrid} style={currentTier === "7-9" ? {} : displayHideStyle}>
        {monsters["7-9"].slice(0, 3).map((monster) => (
          <div className={styles.card} key={monster.monsterId}>
            <HomepageMiniMonsterIDCard monsterId={monster.monsterId} />
            {/* <HomepageMiniMonsterIDCard monsterId={monster.mon}/> */}
          </div>
        ))}
      </div>
      <div className={styles.cardGrid} style={currentTier === "10" ? {} : displayHideStyle}>
        {monsters["10"].slice(0, 3).map((monster) => (
          <div className={styles.card} key={monster.monsterId}>
            <HomepageMiniMonsterIDCard monsterId={monster.monsterId} />
            {/* <HomepageMiniMonsterIDCard monsterId={monster.mon}/> */}
          </div>
        ))}
      </div>
    </div>
  );
  
  
}
