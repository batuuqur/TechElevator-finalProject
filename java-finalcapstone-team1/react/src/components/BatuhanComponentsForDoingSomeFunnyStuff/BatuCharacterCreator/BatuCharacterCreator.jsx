import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CharacterService from "../../../services/CharacterService.js";
import DiceRoll from "../../DiceRoll/DiceRoll.jsx";
import styles from "./BatuCharacterCreator.module.css";
import ClassDetailCard from "../../ClassDetailCard/ClassDetailCard.jsx";
import BatuCharacterCreatorShop from "../BatuCharacterCreatorShop/BatuCharacterCreatorShop.jsx";
import ShopService from "../../../services/ShopService.js";

export default function CharacterCreator() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState(null);
  const [diceRollData, setDiceRollData] = useState([]);

  const [selectedWeaponId, setSelectedWeaponId] = useState(0);
  const [selectedArmorId, setSelectedArmorId] = useState(0);
  const [characterGold, setCharacterGold] = useState(0);

  const [shopData, setShopData] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);


  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 600);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const rolledStats = {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      wisdom: 1,
      intelligence: 1,
      charisma: 1,
    };

    diceRollData.forEach((dice) => {
      if (dice.boundStat === "Str") rolledStats.strength = dice.value;
      if (dice.boundStat === "Dex") rolledStats.dexterity = dice.value;
      if (dice.boundStat === "Con") rolledStats.constitution = dice.value;
      if (dice.boundStat === "Int") rolledStats.intelligence = dice.value;
      if (dice.boundStat === "Wis") rolledStats.wisdom = dice.value;
      if (dice.boundStat === "Cha") rolledStats.charisma = dice.value;
    });

    const character = {
      characterName: name,
      characterClass: characterClass,
      characterLevel: 1,
      strength_integer: rolledStats.strength,
      dexterity_integer: rolledStats.dexterity,
      constitution_integer: rolledStats.constitution,
      wisdom_integer: rolledStats.wisdom,
      intelligence_integer: rolledStats.intelligence,
      charisma_integer: rolledStats.charisma,
      max_health: 0,
      current_health: 0,
      weapon_id: selectedWeaponId || null,
      armor_id: selectedArmorId || null,
      number_of_battles: 0,
      monster_killed_by: "",
      gold: characterGold,
      isAlive: true,
    };

    try {
      CharacterService.postNewCharacter(character);
      navigate("/CharacterLineUp");
    } catch (err) {
      console.error("Character creation failed:", err);
    }
  };

  const isSubmitDisabled =
  !name.trim() ||
  !characterClass ||
  diceRollData.length === 0 ||
  diceRollData.some(d => !d.boundStat || d.value === null || d.value === undefined) ||
  selectedWeaponId === 0 ||
  selectedArmorId === 0;


  const notSelectedStyle = { opacity: 0.5 };

  useEffect(() => {
    if (!characterClass) return;

    ShopService.getStartingShops()
      .then((res) => {
        const classMap = {
          Rogue: 0,
          Archer: 1,
          Barbarian: 2,
        };
        const shopIndex = classMap[characterClass];
        const selected = res.data?.[shopIndex];

        if (!selected) {
          console.warn("Shop not found for class:", characterClass);
          setShopData(null);
        } else {
          setShopData(selected);
        }
      })
      .catch((err) => {
        console.error("Shop fetch error:", err);
        setShopData(null);
      });
  }, [characterClass]);

  return (
    <div className={styles.creatorContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.nameInput}>
          <label>Enter Your Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.classSelection}>
          <h3>Select Class</h3>
          <div className={styles.classCards}>
            <ClassDetailCard
              classString={"Archer"}
              description={"Shoot Shoot!"}
              onClick={() => setCharacterClass("Archer")}
              style={characterClass === "Archer" ? null : notSelectedStyle}
            />
            <ClassDetailCard
              classString={"Barbarian"}
              description={"Kill. Burn. Break."}
              onClick={() => setCharacterClass("Barbarian")}
              style={characterClass === "Barbarian" ? null : notSelectedStyle}
            />
            <ClassDetailCard
              classString={"Rogue"}
              description={"Strikes from the dark, vanishes without a trace."}
              onClick={() => setCharacterClass("Rogue")}
              style={characterClass === "Rogue" ? null : notSelectedStyle}
            />
          </div>
        </div>

        <div className={styles.statRoll}>
          <h3>Stat Roll</h3>
          <div className={styles.diceWrapper}>
            <DiceRoll setDiceRollData={setDiceRollData} />
          </div>
        </div>
      </div>

      <div className={styles.verticalDivider}></div>

      <div className={styles.rightContainer}>
        {characterClass && shopData ? (
          <BatuCharacterCreatorShop
            selectedClass={characterClass}
            setSelectedWeaponId={setSelectedWeaponId}
            setSelectedArmorId={setSelectedArmorId}
            characterGold={characterGold}
            setCharacterGold={setCharacterGold}
            handleSubmit={handleSubmit}
            isSubmitDisabled={isSubmitDisabled}
            externalShopData={shopData}
          />
        
        ) : (
          <p
            className={`${styles.shopPrompt} ${isSpinning ? styles.spin : ""}`}
            onClick={handleSpin}
          >
            WELCOME ROOKIE!
            <br />
            Please select a class to access the shop
          </p>
        )}
      </div>
    </div>
  );
}
