package com.techelevator.model;

public class Monster {

    private int monsterId;

    private String monsterName;

    private String monsterDescription;

    private int monsterTier;

    private int monsterLevel;

    private int strengthInteger;

    private int dexterityInteger;

    private int constitutionInteger;

    private int wisdomInteger;

    private int intelligenceInteger;

    private int charismaInteger;

    private int maxHealth;

    private String armorType;

    private int armorClass;

    private String weaponType;

    private int monsterDamageValue;

    private boolean active;



    public int getMonsterId() {
        return monsterId;
    }

    public void setMonsterId(int monsterId) {
        this.monsterId = monsterId;
    }

    public String getMonsterName() {
        return monsterName;
    }

    public void setMonsterName(String monsterName) {
        this.monsterName = monsterName;
    }

    public String getMonsterDescription() {
        return monsterDescription;
    }

    public void setMonsterDescription(String monsterDescription) {
        this.monsterDescription = monsterDescription;
    }

    public int getMonsterTier() {
        return monsterTier;
    }

    public void setMonsterTier(int monsterTier) {
        this.monsterTier = monsterTier;
    }

    public int getMonsterLevel() {
        return monsterLevel;
    }

    public void setMonsterLevel(int monsterLevel) {
        this.monsterLevel = monsterLevel;
    }

    public int getStrengthInteger() {
        return strengthInteger;
    }

    public void setStrengthInteger(int strengthInteger) {
        this.strengthInteger = strengthInteger;
    }

    public int getDexterityInteger() {
        return dexterityInteger;
    }

    public void setDexterityInteger(int dexterityInteger) {
        this.dexterityInteger = dexterityInteger;
    }

    public int getConstitutionInteger() {
        return constitutionInteger;
    }

    public void setConstitutionInteger(int constitutionInteger) {
        this.constitutionInteger = constitutionInteger;
    }

    public int getWisdomInteger() {
        return wisdomInteger;
    }

    public void setWisdomInteger(int wisdomInteger) {
        this.wisdomInteger = wisdomInteger;
    }

    public int getIntelligenceInteger() {
        return intelligenceInteger;
    }

    public void setIntelligenceInteger(int intelligenceInteger) {
        this.intelligenceInteger = intelligenceInteger;
    }

    public int getCharismaInteger() {
        return charismaInteger;
    }

    public void setCharismaInteger(int charismaInteger) {
        this.charismaInteger = charismaInteger;
    }

    public int getMaxHealth() {
        return maxHealth;
    }

    public void setMaxHealth(int maxHealth) {
        this.maxHealth = maxHealth;
    }

    public String getArmorType() {
        return armorType;
    }

    public void setArmorType(String armorType) {
        this.armorType = armorType;
    }

    public int getArmorClass() {
        return armorClass;
    }

    public void setArmorClass(int armorClass) {
        this.armorClass = armorClass;
    }

    public String getWeaponType() {
        return weaponType;
    }

    public void setWeaponType(String weaponType) {
        this.weaponType = weaponType;
    }

    public int getMonsterDamageValue() {
        return monsterDamageValue;
    }

    public void setMonsterDamageValue(int monsterDamageValue) {
        this.monsterDamageValue = monsterDamageValue;
    }


    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
