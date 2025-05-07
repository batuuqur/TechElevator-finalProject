import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CharacterService from "../../services/CharacterService.js";
import DiceRoll from "../../components/DiceRoll/DiceRoll.jsx";
import styles from "./CharacterCreator.module.css";
import ShopService from "../../services/ShopService.js";
import ClassDetailCard from "../ClassDetailCard/ClassDetailCard.jsx";
import CharacterCreatorShop from "../CharacterCreatorShop/CharacterCreatorShop.jsx";

export default function CharacterCreator() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState(null);
  const [diceRollData, setDiceRollData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [armors, setArmors] = useState([]);
  const [selectedArmorId, setSelectedArmorId] = useState(0);
  const [selectedArmorCost, setSelectedArmorCost] = useState(0);
  const [weapons, setWeapons] = useState([]);
  const [selectedWeaponId, setSelectedWeaponId] = useState(0);
  const [selectedWeaponCost, setSelectedWeaponCost] = useState(0);
  const [gold, setGold] = useState(300);
  const [remainingGold, setRemainingGold] = useState(250);
  const [submitted, setSubmitted] = useState(false);

    const [isSpinning, setIsSpinning] = useState(false);


    const handleSpin = () => {
        setIsSpinning(true);
        // setTimeout(() => setIsSpinning(false), 2500);
    };

  useEffect(() => {
      ShopService.getStartingShops()
          .then((res) => {
          setApiData(res.data);
          if (characterClass === "Rogue") {
              setWeapons(res.data.at(0).weapons);
              setArmors(res.data.at(0).armors);
              resetSelectValues();
          }
          if (characterClass === "Archer") {
              setWeapons(res.data.at(1).weapons);
              setArmors(res.data.at(1).armors);
              resetSelectValues();
          }
          if (characterClass === "Barbarian") {
              setWeapons(res.data.at(2).weapons);
              setArmors(res.data.at(2).armors);
              resetSelectValues();
          }
      });
  }, [characterClass]);

  function resetSelectValues() {
    setSelectedArmorId(0);
    setSelectedWeaponId(0);
    setSelectedArmorCost(0);
    setSelectedWeaponCost(0);
  }

  useEffect(() => {
    setRemainingGold(gold - selectedArmorCost - selectedWeaponCost);
  }, [selectedArmorCost, selectedWeaponCost]);

  function handleArmorSelect(armorData) {
    setSelectedArmorId(armorData.armor_id);
    setSelectedArmorCost(armorData.price);
  }

  function handleWeaponSelect(weaponData) {
    setSelectedWeaponId(weaponData.id);
    setSelectedWeaponCost(weaponData.price);
  }

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Please enter a name before submitting your character.");
      return;
    }

    if (remainingGold < 0) {
          alert("You don't have enough gold for this purchase!");
          return;
    }
  
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
      weapon_id: selectedWeaponId,
      armor_id: selectedArmorId,
      number_of_battles: 0,
      monster_killed_by: "",
      gold: remainingGold,
      isAlive: true,
    };
  
    try {
      CharacterService.postNewCharacter(character);
      setSubmitted(true);
      navigate("/CharacterLineUp");
    } catch (err) {
      console.error("Character creation failed:", err);
    }
  };

  const notSelectedStyle = {
    opacity: 0.5,
  };

    const displayHideStyle = {display: "none"};

    useEffect(() => {
        if (characterClass === "Rogue") {
            console.log("Rogue")
        }
        if (characterClass === "Archer") {
            console.log("Archer")
        }
        if (characterClass === "Barbarian") {
            console.log("Barbarian")
        }
    }, [characterClass]);

  return (
    <div className={styles.creatorContainer}>

        <div className={styles.leftContainer}>

            <div className={styles.nameInput}>
                <label>Enter Your Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className={styles.classSelection}>
                <h3>Select Class</h3>
                <div className={styles.classCards}>
                    <ClassDetailCard
                        className={styles.Archer}
                        classString={"Archer"}
                        description={"A precise hunter skilled with the bow and wilderness survival. They excel at stealth, tracking, and ranged combat, often developing magical connections to nature. Masters of patience and deadly accuracy."}
                        onClick={() => setCharacterClass("Archer")}
                        style={characterClass !== null ? (characterClass === "Archer" ? null : notSelectedStyle) : null}
                    />

                    <ClassDetailCard
                        className={styles.Barbarian}
                        classString={"Barbarian"}
                        description={"A ferocious warrior who harnesses raw fury in battle. They rely on physical prowess and primal rage to crush enemies, thriving on adrenaline and intimidation. Untamed warriors from tribal cultures or wild lands."}
                        onClick={() => setCharacterClass("Barbarian")}
                        style={characterClass !== null ? (characterClass === "Barbarian" ? null : notSelectedStyle) : null}
                    />

                    <ClassDetailCard
                        className={styles.Rogue}
                        classString={"Rogue"}
                        description={"A shadowy expert in stealth, deception, and lethal precision. They strike from darkness, disarm traps, pick locks, and use cunning over brute force. Whether thieves, assassins, or spies, they solve problems with finesse."}
                        onClick={() => setCharacterClass("Rogue")}
                        style={characterClass !== null ? (characterClass === "Rogue" ? null : notSelectedStyle) : null}
                    />
                </div>
            </div>

            <div className={styles.statRoll}>
                {/*<h3>Stat Roll</h3>*/}
                <div className={styles.diceWrapper}>
                    <DiceRoll setDiceRollData={setDiceRollData} />
                </div>
            </div>
        </div>
        <div className={styles.rightContainer}>
            <p
                className={`${styles.shopPrompt} ${isSpinning ? styles.spin : ""}`}
                onClick={handleSpin}
                style={characterClass === null ? {} : displayHideStyle}
            >
                WELCOME ROOKIE!
                <br />
                Please select a class to access the shop
            </p>
            <div className={styles.shopSectionContainer}>
                <CharacterCreatorShop
                    selectedClass={"Rogue"}
                    characterClass={characterClass}
                    handleSubmit={handleSubmit}
                    propSetSelectedWeaponId={setSelectedWeaponId}
                    propSetSelectedArmorId={setSelectedArmorId}
                    gold={gold}
                    setRemainingGold={setRemainingGold}
                    style={characterClass === "Rogue" ? {} : displayHideStyle}
                />
                <CharacterCreatorShop
                    selectedClass={"Archer"}
                    characterClass={characterClass}
                    handleSubmit={handleSubmit}
                    propSetSelectedWeaponId={setSelectedWeaponId}
                    propSetSelectedArmorId={setSelectedArmorId}
                    gold={gold}
                    setRemainingGold={setRemainingGold}
                    style={characterClass === "Archer" ? {} : displayHideStyle}
                />
                <CharacterCreatorShop
                    selectedClass={"Barbarian"}
                    characterClass={characterClass}
                    handleSubmit={handleSubmit}
                    propSetSelectedWeaponId={setSelectedWeaponId}
                    propSetSelectedArmorId={setSelectedArmorId}
                    gold={gold}
                    setRemainingGold={setRemainingGold}
                    style={characterClass === "Barbarian" ? {} : displayHideStyle}
                />
            </div>
        </div>
    </div>
  );
}



// <div className={styles.submitSection}>
//   <p>Gold Remaining: {remainingGold}</p>
//   <button className={styles.submitButton} onClick={handleSubmit}>Submit Character</button>
// </div>


// <div className={styles.verticalDivider}></div>
//
//
// <div className={styles.rightContainer}>
//   <div className={styles.weaponSection}>
//     <h3>Choose Your Weapon</h3>
//     <div className={styles.weaponCards}>
//       {weapons.map((weapon, index)=>{
//         return(
//             <WeaponIDCard
//                 key={index}
//                 weaponData={weapon}
//                 onClick={()=>{handleWeaponSelect(weapons.at(index))}}
//                 style={selectedWeaponId !== 0 ? (weapons.at(index).id === selectedWeaponId ? null : notSelectedStyle) : null}
//             />
//         )
//       })}
//     </div>
//   </div>
//
//   <div className={styles.armorSection}>
//     <h3>Choose Your Armor</h3>
//     <div className={styles.armorCards}>
//       {armors.map((armor, index)=>{
//         return(
//             <ArmorIDCard
//                 key={index}
//                 armorData={armor}
//                 onClick={()=>{handleArmorSelect(armors.at(index))}}
//                 style={selectedArmorId !== 0 ? (armors.at(index).armor_id === selectedArmorId ? null : notSelectedStyle) : null}
//             />
//         )
//       })}
//     </div>
//   </div>
// </div>













