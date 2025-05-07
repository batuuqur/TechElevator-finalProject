package com.techelevator.model;

import java.util.List;

public class CharacterMonstersBattledDTO {

    public Character character;
    public List<Monster> monstersBattled;

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }

    public List<Monster> getMonstersBattled() {
        return monstersBattled;
    }

    public void setMonstersBattled(List<Monster> monstersBattled) {
        this.monstersBattled = monstersBattled;
    }
}
