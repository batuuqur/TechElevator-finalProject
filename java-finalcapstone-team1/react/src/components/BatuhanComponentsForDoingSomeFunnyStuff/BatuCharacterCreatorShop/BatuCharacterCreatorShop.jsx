import ShopService from "../../../services/ShopService.js";
import { useEffect, useState } from "react";
import styles from "./BatuCharacterCreatorShop.module.css";
import WeaponIDCard from "../../IDCards/WeaponIDCard/WeaponIDCard.jsx";
import ArmorIDCard from "../../IDCards/ArmorIDCard/ArmorIDCard.jsx";
import MiniWeaponIDCard from "../../IDCards/WeaponIDCard/MiniWeaponIDCard.jsx";
import MiniArmorIDCard from "../../IDCards/ArmorIDCard/MiniArmorIDCard.jsx";

export default function BatuCharacterCreatorShop({
  style,
  setSelectedWeaponId,
  setSelectedArmorId,
  characterGold,
  setCharacterGold,
  handleSubmit,
  isSubmitDisabled,
  externalShopData
}) {
  const [selectedTier, setSelectedTier] = useState(1);
  const [selectedTierTitle, setSelectedTierTitle] = useState("STEEL");
  const [selectedType, setSelectedType] = useState(1);

  const [weaponList, setWeaponList] = useState([]);
  const [selectedWeaponData, setSelectedWeaponData] = useState();
  const [selectedWeaponId, setLocalSelectedWeaponId] = useState(0);
  const [selectedWeaponCost, setSelectedWeaponCost] = useState(0);

  const [armorList, setArmorList] = useState([]);
  const [selectedArmorData, setSelectedArmorData] = useState();
  const [selectedArmorId, setLocalSelectedArmorId] = useState(0);
  const [selectedArmorCost, setSelectedArmorCost] = useState(0);

  const [noArmorSelected, setNoArmorSelected] = useState(true);
  const [noWeaponSelected, setNoWeaponSelected] = useState(true);
  const [nothingSelected, setNothingSelected] = useState(true);

  const notSelectedStyle = { opacity: 0.5 };
  const displayHideStyle = { display: "none" };
  const displayFlexStyle = { display: "flex" };
  const displaySelectedStyle = { textShadow: "0 0 5px #f8ae1a, 0 0 15px #f8ae1a" };
  const shouldShowChange = selectedWeaponId !== 0 || selectedArmorId !== 0;



  useEffect(() => {
    if (!externalShopData) return;

    setWeaponList(externalShopData.weapons || []);
    setArmorList(externalShopData.armors || []);
    setCharacterGold(500);
  }, [externalShopData]);

  function handleWeaponSelect(weaponData) {
    if (weaponData.id === selectedWeaponId) {
      setSelectedWeaponData();
      setLocalSelectedWeaponId(0);
      setSelectedWeaponCost(0);
      setNoWeaponSelected(true);
      setNothingSelected(true);
      setSelectedWeaponId(0);
    } else {
      setSelectedWeaponData(weaponData);
      setLocalSelectedWeaponId(weaponData.id);
      setSelectedWeaponCost(weaponData.price);
      setNoWeaponSelected(false);
      setNothingSelected(false);
      setSelectedWeaponId(weaponData.id);
    }
  }
  
  

  function handleArmorSelect(armorData) {
    if (armorData.armor_id === selectedArmorId) {
      setSelectedArmorData();
      setLocalSelectedArmorId(0);
      setSelectedArmorCost(0);
      setNoArmorSelected(true);
      setNothingSelected(true);
      setSelectedArmorId(0);
    } else {
      setSelectedArmorData(armorData);
      setLocalSelectedArmorId(armorData.armor_id);
      setSelectedArmorCost(armorData.price);
      setNoArmorSelected(false);
      setNothingSelected(false);
      setSelectedArmorId(armorData.armor_id);
    }
  }
  
  useEffect(() => {
    const totalCost = selectedWeaponCost + selectedArmorCost;
    setCharacterGold(500 - totalCost);
  }, [selectedWeaponCost, selectedArmorCost]);
  

  useEffect(() => {
    const tierNames = ["STEEL", "GREAT", "ENCHANTED", "LEGENDARY"];
    setSelectedTierTitle(tierNames[selectedTier - 1]);
  }, []);

  const renderTier = (title, weaponStart, weaponEnd, armorStart, armorEnd, tierNumber) => (
    <div className={styles.tierSection} id={title} style={selectedTier === tierNumber ? displayFlexStyle : displayHideStyle}>
      <div className={styles.weaponAndArmorContainer}>
        <div className={styles.weaponContainer} style={selectedType === 1 ? displayFlexStyle : displayHideStyle}>
          <div>
            {weaponList.slice(weaponStart, weaponEnd).map((weapon) => (
              <WeaponIDCard
                key={weapon.id}
                weaponData={weapon}
                onClick={() => handleWeaponSelect(weapon)}
                style={selectedWeaponId !== 0 && weapon.id !== selectedWeaponId ? notSelectedStyle : null}
              />
            ))}
          </div>
        </div>

        <div className={styles.armorContainer} style={selectedType === 2 ? displayFlexStyle : displayHideStyle}>
          <div>
            {armorList.slice(armorStart, armorEnd).map((armor) => (
              <ArmorIDCard
                key={armor.armor_id}
                armorData={armor}
                onClick={() => handleArmorSelect(armor)}
                style={selectedArmorId !== 0 && armor.armor_id !== selectedArmorId ? notSelectedStyle : null}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.shopContainer} style={style}>
      <h1 className={styles.shopHeader}>{externalShopData?.className || "Unnamed Shop"}</h1>

      <div className={styles.ArmorWeaponSwitchContainer}>
        <button
          className={styles.WeaponArmorButton}
          onClick={() => setSelectedType(1)}
          style={selectedType === 1 ? displaySelectedStyle : {}}
        >
          Weapon
        </button>
        <span className={styles.ArmorWeaponSwitchSpan}>|</span>
        <button
          className={styles.WeaponArmorButton}
          onClick={() => setSelectedType(2)}
          style={selectedType === 2 ? displaySelectedStyle : {}}
        >
          Armor
        </button>
      </div>

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
          <h3>Gold: {characterGold}</h3>
          <h3 style={!shouldShowChange ? displayHideStyle : {}}>
            Amount: {-selectedArmorCost - selectedWeaponCost}
          </h3>


        </div>
        <div>
          <button
            className={styles.purchaseButton}
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Submit Character
          </button>
        </div>
      </div>
    </div>
  );
}