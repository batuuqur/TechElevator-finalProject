package com.techelevator.model;

import java.util.List;

public class BattleRecapDTO {

    private Character characterBeforeBattle;

    private String characterName;

    private int characterID;

    private String monsterName;

    private int monsterID;

    private String battleWinner;

    private List<String> battleRecap;

    public String getBattleWinner() {
        return battleWinner;
    }

    public void setBattleWinner(String battleWinner) {
        this.battleWinner = battleWinner;
    }

    public List<String> getBattleRecap() {
        return battleRecap;
    }

    public void setBattleRecap(List<String> battleRecap) {
        this.battleRecap = battleRecap;
    }

    public String getCharacterName() {
        return characterName;
    }

    public void setCharacterName(String characterName) {
        this.characterName = characterName;
    }

    public String getMonsterName() {
        return monsterName;
    }

    public void setMonsterName(String monsterName) {
        this.monsterName = monsterName;
    }

    public int getCharacterID() {
        return characterID;
    }

    public void setCharacterID(int characterID) {
        this.characterID = characterID;
    }

    public int getMonsterID() {
        return monsterID;
    }

    public void setMonsterID(int monsterID) {
        this.monsterID = monsterID;
    }

    public Character getCharacterBeforeBattle() {
        return characterBeforeBattle;
    }

    public void setCharacterBeforeBattle(Character characterBeforeBattle) {
        this.characterBeforeBattle = characterBeforeBattle;
    }
}
