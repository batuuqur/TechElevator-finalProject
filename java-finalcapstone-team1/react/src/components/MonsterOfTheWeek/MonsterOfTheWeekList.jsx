import { useEffect, useState } from "react";
import MonsterService from "../../services/MonsterService";
import styles from "../MonsterOfTheWeek/MonsterOfTheWeekList.module.css";
import MiniMonsterIDCard from "../../components/IDCards/MonsterIDCard/MiniMonsterIDCard";

export default function MonsterOfTheWeekList() {
  const [monsters, setMonsters] = useState({
    "1-3": [],
    "4-6": [],
    "7-9": [],
    "10": [],
  });
  const [currentTier, setCurrentTier] = useState("low");

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

  return (
    <div className={styles.flexContainer}>
      <section className={styles.monsterOfTheWeek}>
        <h2 className={styles.title}>Monsters of the Week</h2>
  
        <div className={styles["scrollable-box"]}>
          {/* Low-Level Threats (Lesser and Dire) */}
          <div
            className={`${styles["tier-group"]} ${
              currentTier === "low" ? styles.visible : styles.hidden
            }`}
          >
            <h3 className={styles["tier-group-title"]}>
                <div className={styles["button-container"]}>
                  <button
                    className={styles["tier-button"]}
                    onClick={() =>
                      setCurrentTier((prev) => (prev === "low" ? "high" : "low"))
                    }
                  >
                    {currentTier === "low"
                      ? "Show High-Level Threats"
                      : "Show Low-Level Threats"}
                  </button>
                </div>
              </h3>
            <div className={styles["tier-container"]}>
              <div className={styles["monster-tier"]}>
                <h3>LESSER</h3>
                {monsters["1-3"].slice(0, 3).map((monster) => (
                  <div className={styles["monster-card"]} key={monster.monsterId}>
                    <MiniMonsterIDCard monsterId={monster.monsterId} />
                  </div>
                ))}
              </div>
              <div className={styles["monster-tier"]}>
                <h3>DIRE</h3>
                {monsters["4-6"].slice(0, 3).map((monster) => (
                  <div className={styles["monster-card"]} key={monster.monsterId}>
                    <MiniMonsterIDCard monsterId={monster.monsterId} />
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* High-Level Threats (Mythic and Legendary) */}
          <div
            className={`${styles["tier-group"]} ${
              currentTier === "high" ? styles.visible : styles.hidden
            }`}
          >
            <h3 className={styles["tier-group-title"]}>
              <div className={styles["button-container"]}>
                  <button
                    className={styles["tier-button"]}
                    onClick={() =>
                      setCurrentTier((prev) => (prev === "low" ? "high" : "low"))
                    }
                  >
                    {currentTier === "low"
                      ? "Show High-Level Threats"
                      : "Show Low-Level Threats"}
                  </button>
                </div>
            </h3>
            <div className={styles["tier-container"]}>
              <div className={styles["monster-tier"]}>
                <h3>MYTHIC</h3>
                {monsters["7-9"].slice(0, 3).map((monster) => (
                  <div className={styles["monster-card"]} key={monster.monsterId}>
                    <MiniMonsterIDCard monsterId={monster.monsterId} />
                  </div>
                ))}
              </div>
              <div className={styles["monster-tier"]}>
                <h3>LEGENDARY</h3>
                {monsters["10"].slice(0, 3).map((monster) => (
                  <div className={styles["monster-card"]} key={monster.monsterId}>
                    <MiniMonsterIDCard monsterId={monster.monsterId} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  
}
