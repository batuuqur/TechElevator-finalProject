import { useEffect, useState } from "react";
import WeaponsService from "../../services/WeaponsService";
import ArmorService from "../../services/ArmorService";

export default function CharacterDetails({ character }) {
  const [weaponName, setWeaponName] = useState(null);
  const [armorName, setArmorName] = useState(null);

  useEffect(() => {
    if (character?.weapon_id) {
      WeaponsService.getWeaponById(character.weapon_id)
        .then(res => setWeaponName(`${res.data.name} (Damage: ${res.data.damage})`))
        .catch(() => setWeaponName('Unknown'));
    }
    if (character?.armor_id) {
      ArmorService.getArmorById(character.armor_id)
        .then(res => setArmorName(`${res.data.armor_name} (Armor Class: ${res.data.armor_class_integer})`))
        .catch(() => setArmorName('Unknown'));
    }
  }, [character]);

  if (!character) return null;

  return (
    <div className="character-details-inline">
      <h3>{character.characterName}</h3>
      <p><strong>Class:</strong> {character.characterClass}</p>
      <p><strong>Level:</strong> {character.characterLevel}</p>
      <ul>
        <li><strong>Strength:</strong> {character.strength_integer}</li>
        <li><strong>Dexterity:</strong> {character.dexterity_integer}</li>
        <li><strong>Constitution:</strong> {character.constitution_integer}</li>
        <li><strong>Wisdom:</strong> {character.wisdom_integer}</li>
        <li><strong>Intelligence:</strong> {character.intelligence_integer}</li>
        <li><strong>Charisma:</strong> {character.charisma_integer}</li>
        <li><strong>HP:</strong> {character.current_health} / {character.max_health}</li>
        <li><strong>Battles:</strong> {character.number_of_battles}</li>
        <li><strong>Weapon:</strong> {weaponName || 'Loading...'}</li>
        <li><strong>Armor:</strong> {armorName || 'Loading...'}</li>
        <li><strong>Status:</strong> {character.isAlive ? "Alive" : "Dead"}</li>
      </ul>
    </div>
  );
}
