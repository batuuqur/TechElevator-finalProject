import ShopService from "../../services/ShopService.js";
import { useEffect, useState } from "react";
import styles from "./CharacterCreatorShop.module.css";
import WeaponIDCard from "../IDCards/WeaponIDCard/WeaponIDCard.jsx";
import ArmorIDCard from "../IDCards/ArmorIDCard/ArmorIDCard.jsx";
import CharacterService from "../../services/CharacterService.js";
import MiniWeaponIDCard from "../IDCards/WeaponIDCard/MiniWeaponIDCard.jsx";
import MiniArmorIDCard from "../IDCards/ArmorIDCard/MiniArmorIDCard.jsx";

export default function CharacterCreatorShop({ selectedClass , style , characterClass, handleSubmit , propSetSelectedWeaponId, propSetSelectedArmorId, gold, setRemainingGold}) {

  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [shopData, setShopData] = useState({});

  const [shopTitle, setShopTitle] = useState("");
  const [selectedTier, setSelectedTier] = useState(1);
  const [selectedTierTitle, setSelectedTierTitle] = useState("STEEL");
  const [selectedType, setSelectedType] = useState(1)
  const [characterGold, setCharacterGold] = useState(0);

  const [weaponList, setWeaponList] = useState([]);
  const [selectedWeaponData, setSelectedWeaponData] = useState()
  const [selectedWeaponId, setSelectedWeaponId] = useState(0);
  const [selectedWeaponCost, setSelectedWeaponCost] = useState(0);

  const [armorList, setArmorList] = useState([]);
  const [selectedArmorData, setSelectedArmorData] = useState()
  const [selectedArmorId, setSelectedArmorId] = useState(0);
  const [selectedArmorCost, setSelectedArmorCost] = useState(0);

  const [noArmorSelected, setNoArmorSelected] = useState(true)
  const [noWeaponSelected, setNoWeaponSelected] = useState(true)
  const [nothingSelected, setNothingSelected] = useState(true)

  const [canSubmit, setCanSubmit] = useState(false)

  const notSelectedStyle = { opacity: 0.5 };

  useEffect(() => {
    setLoading(true);
    ShopService.getStartingShops()
      .then((res) => {
        setApiData(res.data);
        const classMap = {
          Rogue: 0,
          Archer: 1,
          Barbarian: 2
        };
        const shopIndex = classMap[selectedClass];
        const selectedShop = res.data.at(shopIndex);


        setShopData(selectedShop);
        setWeaponList(selectedShop.weaponListData);
        setArmorList(selectedShop.armorListData);

        setSelectedWeaponId(0);
        setSelectedArmorId(0);
        setCharacterGold(500);
        setShopTitle(selectedShop.shop.shopTitle);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [selectedClass]);

    useEffect(() => {
        if(selectedClass === "Rogue" && characterClass !== "Rogue")
        {
            setSelectedWeaponData()
            setSelectedWeaponId(0)
            setSelectedWeaponCost(0)

            setSelectedArmorData()
            setSelectedArmorId(0)
            setSelectedArmorCost(0)

            setNoWeaponSelected(true)
            setNothingSelected(true)
        }
        if(selectedClass === "Archer" && characterClass !== "Archer")
        {
            setSelectedWeaponData()
            setSelectedWeaponId(0)
            setSelectedWeaponCost(0)

            setSelectedArmorData()
            setSelectedArmorId(0)
            setSelectedArmorCost(0)

            setNoWeaponSelected(true)
            setNothingSelected(true)
        }
        if(selectedClass === "Barbarian" && characterClass !== "Barbarian")
        {
            setSelectedWeaponData()
            setSelectedWeaponId(0)
            setSelectedWeaponCost(0)

            setSelectedArmorData()
            setSelectedArmorId(0)
            setSelectedArmorCost(0)

            setNoWeaponSelected(true)
            setNothingSelected(true)
        }
    }, [characterClass]);

  function handleWeaponSelect(weaponData) {
      if(weaponData.id === selectedWeaponId)
      {
          setSelectedWeaponData()
          setSelectedWeaponId(0)
          propSetSelectedWeaponId(0)
          setSelectedWeaponCost(0)
          setNoWeaponSelected(true)
          setNothingSelected(true)
      }
      else
      {
          setSelectedWeaponData(weaponData)
          setSelectedWeaponId(weaponData.id)
          propSetSelectedWeaponId(weaponData.id)
          setSelectedWeaponCost(weaponData.price)
          setNoWeaponSelected(false)
          setNothingSelected(false)
      }
  }

  function handleArmorSelect(armorData) {
      if(armorData.armor_id === selectedArmorId)
      {
          setSelectedArmorData()
          setSelectedArmorId(0)
          propSetSelectedArmorId(0)
          setSelectedArmorCost(0)
          setNoArmorSelected(true)
          setNothingSelected(true)
      }
      else
      {
          setSelectedArmorData(armorData)
          setSelectedArmorId(armorData.armor_id)
          propSetSelectedArmorId(armorData.armor_id)
          setSelectedArmorCost(armorData.price)
          setNoArmorSelected(false)
          setNothingSelected(false)
      }
  }


  // function handleSubmit() {
  //
  //   if (selectedWeaponCost + selectedArmorCost > characterGold) {
  //       alert("You don't have enough gold for this purchase.");
  //       return;
  //     }
  //
  //   let submittedWeaponID = 0;
  //   let submittedArmorID = 0;
  //
  //   if(selectedWeaponId === 0)
  //   {
  //       submittedWeaponID = character.characterData.weapon_id;
  //   }
  //   else
  //   {
  //       submittedWeaponID = selectedWeaponId;
  //   }
  //
  //   if(selectedArmorId === 0)
  //   {
  //       submittedArmorID = character.characterData.armor_id;
  //   }
  //   else
  //   {
  //       submittedArmorID = selectedArmorId;
  //   }
  //
  //   const updatedCharacter = {
  //     ...character.characterData,
  //     gold: characterGold - selectedWeaponCost - selectedArmorCost,
  //     weapon_id: submittedWeaponID,
  //     armor_id: submittedArmorID
  //   };

  //   CharacterService.updateCharacter(updatedCharacter)
  //     .then(() => {
  //       console.log("Character updated successfully");
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log("Character update failed", error);
  //     });
  // }

  // function handleTierChange(number)
  // {
  //     if(selectedTier === 1 && number === -1)
  //     {
  //         setSelectedTier(4)
  //     }
  //     else if(selectedTier === 4 && number === 1)
  //     {
  //         setSelectedTier(1)
  //     }
  //     else
  //     {
  //         setSelectedTier(selectedTier+number)
  //     }
  // }
  //
  // useEffect(()=>{
  //     if(selectedTier === 1)
  //     {
  //         setSelectedTierTitle("STEEL")
  //     }
  //     if(selectedTier === 2)
  //     {
  //         setSelectedTierTitle("GREAT")
  //     }
  //     if(selectedTier === 3)
  //     {
  //         setSelectedTierTitle("ENCHANTED")
  //     }
  //     if(selectedTier === 4)
  //     {
  //         setSelectedTierTitle("LEGENDARY")
  //     }
  // },[selectedTier])


  const renderTier = (title, weaponStart, weaponEnd, armorStart, armorEnd, tierNumber) => (
    <div className={styles.tierSection}
         id={title}
         style={selectedTier === tierNumber ? displayFlexStyle : displayHideStyle}
    >
      <div className={styles.weaponAndArmorContainer}>
        <div className={styles.weaponContainer} style={selectedType === 1 ? displayFlexStyle : displayHideStyle}>
            {weaponList.slice(weaponStart, weaponEnd).map((weapon) => (
              <WeaponIDCard
                key={weapon.id}
                weaponData={weapon}
                onClick={() => handleWeaponSelect(weapon)}
                style={
                  selectedWeaponId !== 0 && weapon.id !== selectedWeaponId
                    ? notSelectedStyle
                    : null
                }
              />
            ))}
        </div>

        <div className={styles.armorContainer} style={selectedType === 2 ? displayFlexStyle : displayHideStyle}>
            {armorList.slice(armorStart, armorEnd).map((armor) => (
              <ArmorIDCard
                key={armor.armor_id}
                armorData={armor}
                onClick={() => handleArmorSelect(armor)}
                style={
                  selectedArmorId !== 0 && armor.armor_id !== selectedArmorId
                    ? notSelectedStyle
                    : null
                }
              />
            ))}
        </div>
      </div>
    </div>
  );

  useEffect(()=>{
      if(selectedArmorId !== 0 && selectedWeaponId !== 0)
      {
          setCanSubmit(true)
          setRemainingGold(gold - selectedArmorCost - selectedWeaponCost)
      }
      else
      {
          setCanSubmit(false)
          setRemainingGold(gold)
      }
  },[selectedArmorId, selectedWeaponId])

    const displayHideStyle = {display: "none"};
    const displayFlexStyle = {display: "flex"};
    const displaySelectedStyle = {textShadow: "0 0 5px #f8ae1a, 0 0 15px #f8ae1a"};

  if(loading){
      return <>Loading...</>};

  return (
    <div className={styles.shopContainer} style={style}>
        <div className={styles.TopSection}>
            <h1 className={styles.shopHeader}>{shopTitle}</h1>

            {/*<div className={styles.tierSwitcherContainer}>*/}
            {/*    <button className={styles.LeftRightButton} onClick={()=>{handleTierChange(-1)}}>{"⮘"}</button>*/}
            {/*    <div className={styles.TierTitleContainer}>*/}
            {/*    <h1 className={styles.tierTitle}>{selectedTierTitle}</h1>*/}
            {/*    </div>*/}
            {/*    <button className={styles.LeftRightButton} onClick={()=>{handleTierChange(1)}}>{"⮚"}</button>*/}
            {/*</div>*/}

            <div className={styles.ArmorWeaponSwitchContainer}>
                <button
                    className={styles.WeaponArmorButton}
                    onClick={()=>{setSelectedType(1)}}
                    style={selectedType === 1 ? displaySelectedStyle : {}}
                >Weapon</button>
                <span className={styles.ArmorWeaponSwitchSpan}>{"|"}</span>
                <button
                    className={styles.WeaponArmorButton}
                    onClick={()=>{setSelectedType(2)}}
                    style={selectedType === 2 ? displaySelectedStyle : {}}
                >Armor</button>
            </div>
        </div>

      {/* Render each tier with weapons and armor side by side */}
      {renderTier("LESSER", 0, 3, 0, 3, 1)}
      {renderTier("DIRE", 3, 6, 3, 6, 2)}
      {renderTier("MYTHIC", 6, 9, 6, 9, 3)}
      {renderTier("LEGENDARY", 9, weaponList.length, 9, armorList.length, 4)}

        <div className={styles.ItemsToPurchase}>
            <MiniWeaponIDCard
                className={styles.WeaponToPurchase}
                weaponData={selectedWeaponData}
                onClick={() => handleWeaponSelect(selectedWeaponData)}
                isEmpty={noWeaponSelected}
            />
            <MiniArmorIDCard
                className={styles.ArmorToPurchase}
                armorData={selectedArmorData}
                onClick={() => handleArmorSelect(selectedArmorData)}
                isEmpty={noArmorSelected}
            />
            <div className={styles.goldCalc}>
                <h3>Gold: {gold}</h3>
                <h3 style={ nothingSelected ? displayHideStyle : {}}>Change: {gold - selectedArmorCost - selectedWeaponCost}</h3>
            </div>
            <div>
                <button
                    className={styles.purchaseButton}
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                >
                    { "Submit Character"}
                </button>
            </div>
        </div>
    </div>
  );
}
