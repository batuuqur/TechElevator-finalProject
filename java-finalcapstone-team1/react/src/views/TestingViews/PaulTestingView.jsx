//imports
import { useState, useEffect } from 'react';
import CharacterIDCard from '../../components/IDCards/CharacterIDCard/CharacterIDCard';
import MonsterIDCard from '../../components/IDCards/MonsterIDCard/MonsterIDCard';
import ArmorIDCard from '../../components/IDCards/ArmorIDCard/ArmorIDCard';
import WeaponIDCard from '../../components/IDCards/WeaponIDCard/WeaponIDCard';
import MiniArmorIDCard from '../../components/IDCards/ArmorIDCard/MiniArmorIDCard';
import MiniMonsterIDCard from '../../components/IDCards/MonsterIDCard/MiniMonsterIDCard';
import MiniWeaponIDCard from '../../components/IDCards/WeaponIDCard/MiniWeaponIDCard';
import MiniCharacterIDCard from '../../components/IDCards/CharacterIDCard/MiniCharacterIDCard';
import Shop from '../../components/Shop/Shop.jsx';
import '../../components/AdminAdamPicker/AdminMonsterPicker.jsx';
import AdminMonsterPicker from '../../components/AdminAdamPicker/AdminMonsterPicker.jsx';

export default function PaulTestingView()
{

    const fakeCharacter = 
    {
            "characterData": {
                "userId": 3,
                "characterId": 1,
                "characterName": "poopoo",
                "characterClass": "Barbarian",
                "characterLevel": 1,
                "strength_integer": 69,
                "dexterity_integer": 69,
                "constitution_integer": 420,
                "wisdom_integer": 69,
                "intelligence_integer": 69,
                "charisma_integer": 420,
                "max_health": 100,
                "weapon_id": 3,
                "armor_id": 3,
                "number_of_battles": 0,
                "monster_killed_by": "",
                "gold": 500,
                "isAlive": false
            },
            "weaponData": {
                "id": 3,
                "name": "Rogue Throwing Knives",
                "damage": 15,
                "levelRequirement": 1,
                "classRequirement": "Rogue",
                "weaponTier": 0,
                "price": 100,
                "weaponDescription": "A pair of balanced knives for ranged precision and quick follow-up attacks"
            },
            "armorData": {
                "armor_id": 3,
                "armor_name": "Rogue Chain Shirt",
                "armor_class_integer": 5,
                "levelRequirement": 1,
                "classRequirement": "Rogue",
                "armorTier": 0,
                "price": 100,
                "armorDescription": "Lightweight metal rings; protects vital areas while allowing agility"
            }
    }


    //Place for you to make sumbit buttons to test API
    return(
     <>
        <Shop character={fakeCharacter}/>
     </>
    )
}