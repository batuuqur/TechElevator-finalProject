package com.techelevator.model;


//This will have all of the information needed to fully render a character and their assets
public class CharacterDTO {

    private Character characterData;
    private Weapon weaponData;
    private Armor armorData;

    public Character getCharacterData() {
        return characterData;
    }

    public void setCharacterData(Character characterData) {
        this.characterData = characterData;
    }

    public Weapon getWeaponData() {
        return weaponData;
    }

    public void setWeaponData(Weapon weaponData) {
        this.weaponData = weaponData;
    }

    public Armor getArmorData() {
        return armorData;
    }

    public void setArmorData(Armor armorData) {
        this.armorData = armorData;
    }
}
