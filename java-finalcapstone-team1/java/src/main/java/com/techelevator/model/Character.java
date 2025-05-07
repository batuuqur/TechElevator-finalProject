package com.techelevator.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class Character
{
    private int userId;

    @Min( value = 1, message = "The field 'characterId' is required.")
    private int characterId;

    @NotBlank( message = "The field 'characterName' is required.")
    private String characterName;

    @NotBlank( message = "The field 'characterClass' is required.")
    private String characterClass;

    @Min( value = 1, message = "The field 'character_level' is required.")
    private int characterLevel;

    @Min( value = 1, message = "The field 'strength_integer' is required.")
    private int strength_integer;

    @Min( value = 1, message = "The field 'dexterity_integer' is required.")
    private int dexterity_integer;

    @Min( value = 1, message = "The field 'constitution_integer' is required.")
    private int constitution_integer;

    @Min( value = 1, message = "The field 'wisdom_integer' is required.")
    private int wisdom_integer;

    @Min( value = 1, message = "The field 'intelligence_integer' is required.")
    private int intelligence_integer;

    @Min( value = 1, message = "The field 'charisma_integer' is required.")
    private int charisma_integer;

    @Min( value = 1, message = "The field 'max_health' is required.")
    private int max_health;

    @Min( value = 1, message = "The field 'weapon_id' is required.")
    private int weapon_id;

    @Min( value = 1, message = "The field 'armor_id' is required.")
    private int armor_id;

    @Min( value = 0, message = "The field 'number_of_battles' is required.")
    private int number_of_battles;

    @JsonProperty("monster_killed_by")
    private String monsterKilledBy;

    @JsonProperty("gold")
    private int gold;

    @JsonProperty("isAlive")
    private boolean isAlive;


    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getCharacterName() {
        return characterName;
    }

    public void setCharacterName(String characterName) {
        this.characterName = characterName;
    }

    public String getCharacterClass() {
        return characterClass;
    }

    public void setCharacterClass(String characterClass) {
        this.characterClass = characterClass;
    }
    public int getCharacterLevel() {
        return characterLevel;
    }

    public void setCharacterLevel(int characterLevel) {
        this.characterLevel = characterLevel;
    }

    public int getStrength_integer() {
        return strength_integer;
    }

    public void setStrength_integer(int strength_integer) {
        this.strength_integer = strength_integer;
    }

    public int getDexterity_integer() {
        return dexterity_integer;
    }

    public void setDexterity_integer(int dexterity_integer) {
        this.dexterity_integer = dexterity_integer;
    }

    public int getConstitution_integer() {
        return constitution_integer;
    }

    public void setConstitution_integer(int constitution_integer) {
        this.constitution_integer = constitution_integer;
    }

    public int getWisdom_integer() {
        return wisdom_integer;
    }

    public void setWisdom_integer(int wisdom_integer) {
        this.wisdom_integer = wisdom_integer;
    }

    public int getIntelligence_integer() {
        return intelligence_integer;
    }

    public void setIntelligence_integer(int intelligence_integer) {
        this.intelligence_integer = intelligence_integer;
    }

    public int getCharisma_integer() {
        return charisma_integer;
    }

    public void setCharisma_integer(int charisma_integer) {
        this.charisma_integer = charisma_integer;
    }


    public int getCharacterId() {
        return characterId;
    }

    public void setCharacterId(int characterId) {
        this.characterId = characterId;
    }

    @JsonProperty("isAlive")
    public boolean isAlive() {
        return isAlive;
    }

    @JsonProperty("isAlive")
    public void setAlive(boolean alive) {
        isAlive = alive;
    }

    public int getMax_health() {
        return max_health;
    }

    public void setMax_health(int max_health) {
        this.max_health = max_health;
    }

    public int getWeapon_id() {
        return weapon_id;
    }

    public void setWeapon_id(int weapon_id) {
        this.weapon_id = weapon_id;
    }

    public int getArmor_id() {
        return armor_id;
    }

    public void setArmor_id(int armor_id) {
        this.armor_id = armor_id;
    }

    public int getNumber_of_battles() {
        return number_of_battles;
    }

    public void setNumber_of_battles(int number_of_battles) {
        this.number_of_battles = number_of_battles;
    }


    public String getMonsterKilledBy() {
        return monsterKilledBy;
    }

    public void setMonsterKilledBy(String monsterKilledBy) {
        this.monsterKilledBy = monsterKilledBy;
    }

    public int getGold() {
        return gold;
    }

    public void setGold(int gold) {
        this.gold = gold;
    }
}
